/**
 * Tema ve hareket başlangıcı — <head> içinde SENKRON çalışır.
 *
 * Neden ayrı bir dosya, inline değil:
 * GitHub Pages HTTP header veremediği için CSP <meta> ile kuruluyor ve
 * script-src 'self' olarak sıkı tutuluyor. Ayrı dosya bu politikaya doğal
 * olarak uyar; inline olsaydı her sayfa için sha256 hash'i gerekirdi.
 *
 * Yaptığı işler:
 *   1) <html class="js">           → JS gerektiren kontroller görünür olur
 *   2) data-theme                  → yalnızca kullanıcı DAHA ÖNCE seçtiyse
 *   3) <html class="reveal-ready"> → scroll-reveal yalnızca güvenliyse
 *   4) reveal için ölü adam düğmesi (aşağıya bakın)
 *
 * (2) bilinçli olarak koşullu: kullanıcı bir tercih kaydetmediyse attribute
 * hiç yazılmaz ve tema, CSS'teki prefers-color-scheme ile sistemi canlı takip
 * eder — işletim sistemi temasını değiştirince sayfa yenileme gerekmez.
 */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      root.setAttribute('data-theme', stored);
    }
  } catch (e) {
    /* private mode / storage kapalı — sistem tercihi geçerli kalır */
  }

  /*
   * `reveal-ready` sınıfı [data-reveal] öğelerini opacity:0 yapar ve onları
   * yeniden görünür kılan TEK kod nav.ts'teki IntersectionObserver'dır.
   * Yani bu sınıf, sayfanın görünürlüğünü bir JS bundle'ına bağımlı kılar.
   *
   * Bu bir kez gerçek bir boş sayfaya yol açabilirdi: iOS 13 Safari'de
   * MediaQueryList.addEventListener yok; aynı bundle'ın başındaki
   * theme-toggle throw edince nav.ts hiç çalışmıyor ve sayfadaki ~87
   * [data-reveal] öğesi sonsuza kadar görünmez kalıyordu.
   *
   * İki katmanlı korunma:
   *   a) IntersectionObserver yoksa sınıfı hiç ekleme
   *   b) eklediysek, nav.ts 2 saniye içinde kendini bildirmezse geri al
   */
  try {
    var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionOk && typeof window.IntersectionObserver === 'function') {
      root.classList.add('reveal-ready');

      window.setTimeout(function () {
        if (root.dataset.navReady !== '1') {
          root.classList.remove('reveal-ready');
        }
      }, 2000);
    }
  } catch (e) {
    /* matchMedia yoksa reveal hiç başlamaz, içerik baştan görünür */
  }
})();
