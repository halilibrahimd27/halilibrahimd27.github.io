# halilibrahimd27.github.io

Kişisel tanıtım sitesi — **Astro 7 + Tailwind 4 + TypeScript**, tamamen statik, GitHub Pages'te yayınlanıyor.

TR `/` · EN `/en/` · [Kullandıklarım](/uses) · [/en/uses](/en/uses)

---

## Neyi nereden değiştirirsiniz

Sitedeki **hiçbir metin bileşenlerin içine gömülü değil.** Hepsi `src/data/` altındaki tek kaynak dosyalarda.

| Ne değişecek                         | Dosya                    |
| ------------------------------------ | ------------------------ |
| Türkçe metinlerin tamamı             | `src/data/content.tr.ts` |
| İngilizce metinlerin tamamı          | `src/data/content.en.ts` |
| Projeler (repo, etiket, görünürlük)  | `src/data/projects.ts`   |
| İş / eğitim / gönüllülük tarihleri   | `src/data/timeline.ts`   |
| Yetenek kategorileri ve araçlar      | `src/data/skills.ts`     |
| E-posta, linkler, CV dosya adı       | `src/data/site.ts`       |
| Renk / tipografi / boşluk token'ları | `src/styles/global.css`  |
| Yayın adresi ve alt dizin (`base`)   | `astro.config.ts`        |

### İki dil asla ayrışamaz

`content.tr.ts` ve `content.en.ts`, `src/data/types.ts` içindeki `Content` sözleşmesini
`satisfies` ile karşılar. Birine alan ekleyip diğerine eklemeyi unutursanız **`pnpm build` kırılır.**
Aynısı proje / deneyim / eğitim id'leri için de geçerli: `projects.ts`'e yeni bir proje eklerseniz,
iki dil dosyasına da açıklamasını eklemeden build geçmez.

### Yeni proje eklemek

1. `src/data/projects.ts` içine bir obje:

   ```ts
   {
     id: 'repo-adi',                         // GitHub repo adı = kart başlığı
     repo: 'halilibrahimd27/repo-adi',
     tech: ['Python', 'Docker'],
     tier: 'featured',                       // featured | more | hidden
     homepage: 'https://...',                // opsiyonel, "Canlı" linki
     stars: 0,                               // GitHub'a ulaşılamazsa yedek değer
     updated: '2026-09-22',
   }
   ```

2. `content.tr.ts` ve `content.en.ts` → `projects.items` altına aynı `id` ile birer `tagline`.

Başka hiçbir dosyaya dokunmanız gerekmez.

**`tier` ne yapar:**
`featured` büyük kart, `more` kompakt satır, `hidden` hiç render edilmez.
Şu an `yepaket`, `trafik-analiz` ve `RealTimeObjectDetection` gizli — göstermek için
`tier`'ı `'more'` yapmanız yeterli, açıklamaları iki dilde de hazır duruyor.

---

## Doldurmanız gereken yerler

Kodda bilerek bırakılmış üç placeholder var:

| Placeholder                                                                    | Nerede                                            | Ne yapmalı                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<PLACEHOLDER_EMAIL>`                                                          | `src/data/site.ts` → `EMAIL`                      | Gerçek adresinizi yazın. Yazana kadar İletişim'de "Yakında eklenecek" görünür, **kırık `mailto:` linki basılmaz.** Adres otomatik olarak HTML entity'lerine çevrilir (scraper koruması); siz düz metin yazın. |
| `<PLACEHOLDER_LAPTOP>` / `<PLACEHOLDER_HOMELAB>` / `<PLACEHOLDER_PERIPHERALS>` | `content.tr.ts` + `content.en.ts` → `uses.groups` | `/uses` sayfasındaki donanım satırları. Elimde gerçek bilginiz olmadığı için uydurulmadı.                                                                                                                     |
| CV dosyası                                                                     | `public/cv/HALIL_IBRAHIM_DURMUS_CV_INTL.pdf`      | Dosyayı koyduğunuz anda hero ve İletişim'deki "CV indir" butonu **kendiliğinden görünür.** Dosya yokken buton hiç render edilmez.                                                                             |

---

## Komutlar

```bash
pnpm install          # Node 22 gerekir
pnpm dev              # http://localhost:4321
pnpm build            # → dist/
pnpm preview          # dist/'i yerelde sun

pnpm typecheck        # astro check — iki dilin sözleşmesini de doğrular
pnpm lint             # eslint
pnpm format           # prettier --write
pnpm check:links      # dist: dış link rel'leri + CSP denetimi
pnpm linkcheck        # dist: kırık iç link taraması
pnpm check:browser    # konsol temizliği + JS kapalı senaryosu (puppeteer gerekir)
```

`check:browser` CI'da koşmaz; tarayıcı sürücüsü kalıcı bağımlılık değil:

```bash
pnpm build && pnpm preview &
pnpm add -D puppeteer-core
pnpm check:browser
pnpm remove puppeteer-core
```

### OG görselleri

`public/og/og-tr.png`, `public/og/og-en.png` ve `public/apple-touch-icon.png` **commit'li**.
Üretim bağımlılıkları (satori, resvg) bilerek kalıcı kurulu değil — CI'ın her koşuda native
bir binary indirmesine gerek yok.

Ad, ünvan, `meta.ogTagline` ya da accent rengi değişirse yeniden üretin:

```bash
pnpm og   # bağımlılıkları kurar → üretir → kaldırır
```

---

## Deploy

`main`'e push → `.github/workflows/deploy.yml` → build → `actions/deploy-pages`.
İzinler minimumda (`contents: read`, `pages: write`, `id-token: write`) ve
**tüm action'lar commit SHA'sına pinli** (tag taşınabilir, SHA taşınmaz).

Ayrıca her PR'da `ci.yml`: typecheck → lint → format → build → çıktı denetimi → link taraması.

**İlk kurulum:** repo → Settings → Pages → _Source: GitHub Actions_.

### Siteyi başka bir adrese taşımak

Değiştirilecek **tek yer** `astro.config.ts`'in başı:

```ts
const SITE = 'https://halilibrahimd27.github.io';
const BASE = '/';
```

| Senaryo                           | `SITE`                              | `BASE`        |
| --------------------------------- | ----------------------------------- | ------------- |
| User site (`kullanici.github.io`) | `https://halilibrahimd27.github.io` | `/`           |
| Proje repo'su (`.../portfolyo`)   | `https://halilibrahimd27.github.io` | `/portfolyo/` |
| Özel alan adı                     | `https://ornek.com`                 | `/`           |

Tüm iç linkler, sitemap, `hreflang` ve OG adresleri bu ikisinden türetilir; sabit yazılmış yol yoktur.

### Özel alan adı (custom domain)

1. `public/CNAME` dosyası oluşturun, içine **tek satır** alan adını yazın (şema ve eğik çizgi yok):

   ```
   ornek.com
   ```

2. DNS kayıtları:
   - **apex** (`ornek.com`) → dört `A` kaydı: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **www** → `CNAME` → `halilibrahimd27.github.io`
3. `astro.config.ts` → `SITE = 'https://ornek.com'`, `BASE = '/'`.
4. Settings → Pages → Custom domain'e aynı adı girin, **Enforce HTTPS**'i işaretleyin.

---

## Teknik kararlar

**Client JS toplamı ~3.5 KB (ham).** UI framework yok — React/Preact/Svelte hiçbiri kurulu değil.
Bir senkron başlangıç script'i ve dört vanilla TypeScript island:

| Script                 | İşi                             | JS kapalıyken                    |
| ---------------------- | ------------------------------- | -------------------------------- |
| `public/theme-init.js` | Senkron tema + reveal hazırlığı | Tema sistem tercihini izler      |
| `theme-toggle.ts`      | Tema değiştirici                | Buton hiç görünmez               |
| `lang-switch.ts`       | Dil değiştirici, bölümü korur   | Link çalışır, sayfa başına gider |
| `github-stats.ts`      | Yıldız + son güncelleme         | Statik veri zaten basılı         |
| `nav.ts`               | Scroll-spy + scroll-reveal      | Linkler çalışır, vurgu olmaz     |

**JS tamamen kapalıyken site eksiksiz okunur.** Kaybolan tek şey: tema butonu, canlı GitHub
sayıları ve aktif bölüm vurgusu.

**Tema:** kullanıcı bir tercih kaydetmediği sürece `data-theme` attribute'u hiç yazılmaz ve site
işletim sistemi temasını **canlı** izler. Toggle'a basıldığında seçim `localStorage`'a yazılır.

**Kontrast:** accent (`#4ADE80`) beyaz üstünde 1.7:1 — açık temada metin olarak kullanılamaz.
Bu yüzden iki ayrı token var: `--color-accent` (dekoratif) ve `--color-accent-fg` (metin,
açık temada `#15803D` ≈ 5.0:1). Hepsi WCAG AA geçer.

**Fontlar** self-hosted, yalnızca `latin` + `latin-ext` alt kümeleri paketlenir
(`latin-ext` Türkçe için zorunlu: ğ Ğ ş Ş İ orada). Dört `.woff2`, toplam ~190 KB, hiçbir CDN isteği yok.

**GitHub verisi:** kartlar sunucuda statik veriyle **tam** render edilir; script yalnızca metni
yerinde günceller. İstek başarısız olursa (offline, rate-limit) sessizce statik değerde kalır —
hata gösterilmez, düzen kaymaz. Tek istek, 1 saatlik `localStorage` cache, auth yok.

**CSP** `<meta http-equiv>` ile kuruluyor (GitHub Pages HTTP header veremiyor):

```
default-src 'self'; script-src 'self' 'sha256-…'; style-src 'self';
img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.github.com;
object-src 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests
```

`'unsafe-inline'` **yok**: `build.inlineStylesheets: 'never'` ile inline `<style>` üretilmiyor,
geriye kalan tek inline blok olan JSON-LD'nin sha256'sı build sonunda `integrations/csp.ts`
tarafından politikaya yazılıyor.

> **Dürüst sınır:** `<meta>` ile kurulan CSP'de `frame-ancestors`, `sandbox` ve `report-uri`
> tarayıcı tarafından **yok sayılır** (spec gereği). GitHub Pages header veremediği için bu üçü
> bu sitede uygulanamıyor; politikaya varmış gibi eklenmedi.

---

## Dizin yapısı

```
src/
├─ data/           # TÜM içerik ve tip sözleşmesi
├─ i18n/           # dil yapılandırması, yol ve tarih yardımcıları
├─ layouts/        # Base.astro — head, iskelet, island'lar
├─ components/
│  ├─ head/        # Seo, JsonLd
│  ├─ nav/         # TopBar, SideRail
│  ├─ controls/    # ThemeToggle, LangSwitch
│  ├─ sections/    # Hero, About, Experience, Projects, …
│  └─ ui/          # Section, ProjectCard, ProjectRow, RepoMeta, ExternalLink
├─ scripts/        # client island'ları (vanilla TS)
├─ styles/         # global.css (token'lar), fonts.css
├─ assets/fonts/   # self-hosted woff2 alt kümeleri
└─ pages/          # /, /uses, /en/, /en/uses, /404, /robots.txt

integrations/csp.ts          # inline script → sha256 → CSP meta
scripts/og.ts                # OG görseli üretimi (tek seferlik)
scripts/check-external-links.mjs  # rel="noopener noreferrer" + CSP denetimi
```

---

## Lisans

Kod MIT. İçerik (metinler, CV, görseller) telif hakkı saklıdır.
