/**
 * Tema ve hareket başlangıcı — <head> içinde SENKRON çalışır.
 *
 * Neden ayrı bir dosya, inline değil:
 * GitHub Pages HTTP header veremediği için CSP <meta> ile kuruluyor ve
 * script-src 'self' olarak sıkı tutuluyor. Ayrı dosya bu politikaya doğal
 * olarak uyar; inline olsaydı her sayfa için sha256 hash'i gerekirdi.
 *
 * Yaptığı üç şey:
 *   1) <html class="js">          → JS gerektiren kontroller görünür olur
 *   2) data-theme                 → yalnızca kullanıcı DAHA ÖNCE seçtiyse
 *   3) <html class="reveal-ready"> → scroll-reveal yalnızca izin varsa
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

  try {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('reveal-ready');
    }
  } catch (e) {
    /* matchMedia yoksa reveal hiç başlamaz, içerik baştan görünür */
  }
})();
