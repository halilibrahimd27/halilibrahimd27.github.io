/**
 * Scroll-spy + scroll-reveal.
 *
 * JS kapalıyken: nav linkleri normal çapa linki olarak çalışır, tüm içerik
 * görünür kalır. Hareket azaltma tercihinde reveal hiç başlamaz
 * (theme-init.js `reveal-ready` sınıfını eklemez).
 */

const root = document.documentElement;

/* ─── Scroll-spy ─────────────────────────────────────────────────────────── */

const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'));

if (sections.length > 0 && navLinks.length > 0) {
  /**
   * Aktif bölüm = ekranda EN ÇOK YER KAPLAYAN bölüm.
   *
   * Denenip elenen iki basit kural:
   *   - "görünen ilk bölüm": uzun bir bölümün kuyruğu görünürken bir sonrakine
   *     geçilmiş oluyor, eski bölüm işaretli kalıyordu.
   *   - "üst kenarı okuma çizgisini geçmiş son bölüm": bölümler arasındaki
   *     160px'lik dolgu önceki bölüme sayıldığı için, #skills gibi bir çapaya
   *     atlandığında hâlâ "Projeler" işaretli kalıyordu.
   *
   * Görünür alan kuralı ikisini de doğru çözüyor ve hero'dayken hiçbir nav
   * linkini işaretlemiyor (#top'un nav karşılığı yok).
   */
  const pickActive = (): string | undefined => {
    const viewport = window.innerHeight;
    let best: string | undefined;
    let bestArea = 0;

    for (const section of sections) {
      const { top, bottom } = section.getBoundingClientRect();
      const area = Math.min(bottom, viewport) - Math.max(top, 0);

      if (area > bestArea) {
        bestArea = area;
        best = section.id;
      }
    }

    return best;
  };

  const markActive = (): void => {
    const active = pickActive();
    if (!active || root.dataset.section === active) return;

    root.dataset.section = active;

    for (const link of navLinks) {
      const isActive = link.dataset.navLink === active;
      link.dataset.active = isActive ? 'true' : 'false';
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  };

  /* rAF ile kısıtlama: kaydırma başına en fazla bir ölçüm. */
  let queued = false;
  const schedule = (): void => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      markActive();
    });
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });

  /* Sayfa #hash ile açıldıysa ilk ölçüm yerleşme bittikten sonra yapılır. */
  markActive();
  window.addEventListener('load', schedule);
}

/* ─── Scroll-reveal ──────────────────────────────────────────────────────── */

if (root.classList.contains('reveal-ready')) {
  /*
   * theme-init.js'in ölü adam düğmesine "buradayım" de. Bu satır çalışmazsa
   * (bundle yüklenemedi, önceki bir modül throw etti) 2 saniye sonra
   * reveal-ready kaldırılır ve içerik yine de görünür olur.
   */
  root.dataset.navReady = '1';

  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

  const reveal = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );

  for (const target of targets) reveal.observe(target);
}

/* Bu dosya bir modül olarak derlensin — global scope kirlenmesin. */
export {};
