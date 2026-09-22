/**
 * Tema değiştirici (island #1).
 *
 * Seçim localStorage'da kalır. Kullanıcı hiç seçim yapmadıysa attribute
 * yazılmaz ve site sistem tercihini canlı takip eder (theme-init.js'e bakın).
 */

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const root = document.documentElement;
const lightQuery = window.matchMedia('(prefers-color-scheme: light)');

function effectiveTheme(): Theme {
  const attr = root.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return lightQuery.matches ? 'light' : 'dark';
}

function buttons(): NodeListOf<HTMLButtonElement> {
  return document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
}

/**
 * Butonun erişilebilir ADI sabit kalır ("Tema"), DURUMU aria-pressed ile
 * bildirilir. Önceki sürümde ad sessizce değişiyordu: ekran okuyucu basma
 * sonrası hiçbir şey duyurmuyor, kullanıcı temanın değişip değişmediğini
 * anlayamıyordu.
 */
function syncButtons(): void {
  const current = effectiveTheme();

  for (const button of buttons()) {
    button.setAttribute('aria-pressed', current === 'dark' ? 'true' : 'false');
    button.dataset.theme = current;
  }
}

function setTheme(theme: Theme): void {
  root.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage kapalıysa tema yine de bu oturum için geçerli olur */
  }
  syncButtons();
  syncThemeColor(theme);
}

/**
 * Mobil tarayıcı çubuğunun rengi.
 *
 * Sayfa iki `<meta name="theme-color" media="...">` ile gelir; bunlar SİSTEM
 * temasını izler. Kullanıcı sayfa içinden temayı değiştirdiğinde çubuk
 * sayfayla çelişiyordu. İlk tercihte media'ya bağlı olanları kaldırıp
 * media'sız tek bir meta devralıyor.
 */
const themeColors: Record<Theme, string> = { light: '', dark: '' };

for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"][media]')) {
  if (meta.media.includes('light')) themeColors.light = meta.content;
  if (meta.media.includes('dark')) themeColors.dark = meta.content;
}

function syncThemeColor(theme: Theme): void {
  const value = themeColors[theme];
  if (!value) return;

  for (const meta of document.querySelectorAll('meta[name="theme-color"][media]')) {
    meta.remove();
  }

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'theme-color';
    document.head.appendChild(meta);
  }
  meta.content = value;
}

/**
 * MediaQueryList.addEventListener iOS 13 ve altında yok. Korumasız bırakılırsa
 * burada atılan TypeError aynı bundle'daki nav.ts'i de öldürüyor ve sayfa
 * bomboş açılıyordu.
 */
function onSystemThemeChange(handler: () => void): void {
  if (typeof lightQuery.addEventListener === 'function') {
    lightQuery.addEventListener('change', handler);
  } else if (typeof lightQuery.addListener === 'function') {
    lightQuery.addListener(handler);
  }
}

for (const button of buttons()) {
  button.addEventListener('click', () => {
    setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');
  });
}

/* Kullanıcı kendi tercihini kaydetmediyse sistem değişimini anlık yansıt. */
onSystemThemeChange(() => {
  if (!root.hasAttribute('data-theme')) syncButtons();
});

syncButtons();

/* Bu dosya bir modül olarak derlensin — global scope kirlenmesin. */
export {};
