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

/** Buton etiketi "geçilecek" temayı anlatır, mevcut olanı değil. */
function syncButtons(): void {
  const current = effectiveTheme();
  const next: Theme = current === 'dark' ? 'light' : 'dark';

  for (const button of buttons()) {
    const label = next === 'light' ? button.dataset.labelLight : button.dataset.labelDark;
    if (label) button.setAttribute('aria-label', label);
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
}

for (const button of buttons()) {
  button.addEventListener('click', () => {
    setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');
  });
}

/* Kullanıcı kendi tercihini kaydetmediyse sistem değişimini anlık yansıt. */
lightQuery.addEventListener('change', () => {
  if (!root.hasAttribute('data-theme')) syncButtons();
});

syncButtons();

/* Bu dosya bir modül olarak derlensin — global scope kirlenmesin. */
export {};
