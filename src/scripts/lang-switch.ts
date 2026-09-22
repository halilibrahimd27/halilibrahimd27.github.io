/**
 * Dil değiştirici (island #2).
 *
 * Aynı bölümde kalarak geçiş yapar: bölüm id'leri iki dilde de aynı
 * (#about, #experience …) olduğu için, o anda görünen bölümün id'si hedef
 * dilin adresine eklenir. Aktif bölümü scroll-spy (nav.ts) yazar.
 *
 * JS yokken link yine çalışır — sadece sayfanın başına gider.
 */

const langLinks = document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]');

for (const link of langLinks) {
  link.addEventListener('click', (event) => {
    /* Yeni sekme / orta tık gibi durumlara karışma */
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;

    const section = document.documentElement.dataset.section;
    if (!section) return;

    event.preventDefault();
    window.location.href = `${link.href.split('#')[0]}#${section}`;
  });
}

export {};
