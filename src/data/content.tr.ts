import type { Content } from './types';
import type { EducationId, ExperienceId, VolunteeringId } from './timeline';
import type { ProjectId } from './projects';
import type { SkillGroupId } from './skills';

/**
 * TÜRKÇE İÇERİK — sitedeki her Türkçe metin burada.
 * Bileşenlerin içine gömülü tek bir cümle yoktur.
 *
 * content.en.ts ile aynı `Content` sözleşmesine uyar; bir alanı burada
 * değiştirip orada unutursanız `pnpm build` hata verir.
 */
export const tr = {
  meta: {
    locale: 'tr',
    htmlLang: 'tr-TR',
    title: 'Halil İbrahim Dürmüş — DevSecOps Engineer',
    description:
      'DevSecOps Engineer. Proxmox ve Docker altyapıları, GitOps tabanlı CI/CD hatları, pre-commit’ten runtime’a uzanan savunma katmanları.',
    ogImageAlt: 'Halil İbrahim Dürmüş — DevSecOps Engineer',
    ogTagline: 'Güvenli yazılım teslimi · Dayanıklı operasyon · Ofansif bakış',
    usesTitle: 'Kullandıklarım — Halil İbrahim Dürmüş',
    usesDescription: 'Günlük işimde kullandığım altyapı, teslim hattı ve güvenlik araçları.',
  },

  ui: {
    skipToContent: 'İçeriğe geç',
    sectionsLabel: 'Bölümler',
    themeToggle: 'Temayı değiştir',
    themeLight: 'Açık tema',
    themeDark: 'Koyu tema',
    languageLabel: 'Dil',
    switchTo: 'English',
    backToTop: 'Başa dön',
    externalLink: 'yeni sekmede açılır',
    stars: 'yıldız',
    updatedPrefix: 'güncellendi',
    liveDemo: 'Canlı',
    sourceCode: 'Kaynak',
    present: 'devam',
    inPreparation: 'hazırlık aşamasında',
    backHome: 'Ana sayfaya dön',
  },

  nav: {
    about: 'Hakkımda',
    experience: 'Deneyim',
    projects: 'Projeler',
    skills: 'Yetenekler',
    principles: 'Prensipler',
    education: 'Eğitim',
    contact: 'İletişim',
  },

  hero: {
    name: 'Halil İbrahim Dürmüş',
    role: 'DevSecOps Engineer',
    positioning:
      'Production ölçekli Proxmox ve Docker altyapılarını işleten, pre-commit’ten runtime’a uzanan savunma katmanlarını ve GitOps tabanlı CI/CD hatlarını uçtan uca sahiplenen bir mühendisim. Odağım güvenli yazılım teslimi (SAST/SCA/SBOM, imzalı imaj), dayanıklı operasyon (SLO, suçlusuz postmortem, runbook hijyeni) ve ofansif bakış açısı.',
    locationLabel: 'Konum',
    location: 'Türkiye · Remote (UTC+3)',
    nowHeading: 'Şu an',
    roleLabel: 'Rol',
    companyLabel: 'Şirket',
    prepLabel: 'Hazırlık',
    ctaGithub: 'GitHub',
    ctaLinkedin: 'LinkedIn',
    ctaCv: 'CV indir',
  },

  about: {
    heading: 'Hakkımda',
    paragraphs: [
      'Ayssoft’ta şirketin tek DevOps mühendisiyim: commit’ten production’a kadar bütün teslim zinciri bende. Çoklu Proxmox node üzerinde bugüne kadar 100’den fazla sanal makine kurdum ve işletiyorum; 90’dan fazla container tabanlı repository GitHub Actions ile build edilip dağıtılıyor.',
      'Altyapıya full-stack Java ve React geliştiriciliğinden geldim. Bu, nasıl çalıştığımı belirliyor: geliştirme ekiplerinin etrafından dolaşacağı değil, benimseyeceği sertleştirme, secret yönetimi ve gözlemlenebilirlik kuruyorum.',
      'Üretim olaylarına müdahaleyi ben yürütüyorum — Proxmox LVM thin-pool tükenmesi, Redis AOF bozulması, MySQL 8 fiziksel restore, Kafka offset kurtarma, çok kiracılı Docker stack arızaları. Şu an OSCP+ ve CKS’e hazırlanıyorum.',
    ],
    languagesLabel: 'Diller',
    languages: ['Türkçe — ana dil', 'İngilizce — CEFR B1–B2'],
  },

  experience: {
    heading: 'Deneyim',
    items: {
      ayssoft: {
        role: 'DevSecOps Engineer',
        summary: 'Şirketin tek DevOps mühendisi; commit’ten production’a teslim zincirinin sahibi.',
        bullets: [
          'Çoklu Proxmox VE node üzerinde 100+ sanal makinenin kurulumu ve işletimi: Docker iş yükleri, HAProxy ve Nginx reverse proxy’ler, veritabanı servisleri.',
          '90+ container tabanlı repository için GitHub Actions CI/CD; yeniden kullanılabilir workflow’lar ve BuildKit layer cache ile tekrar eden pipeline kodunun kaldırılması.',
          'Pipeline’a güvenlik kontrollerinin yerleştirilmesi: SAST ve yazılım bileşen analizi, Trivy ile imaj taraması, HashiCorp Vault ile merkezî secret yönetimi, en az yetkili registry ve erişim token’ları.',
          'Üretim olay müdahalesinin yürütülmesi: Proxmox LVM thin-pool tükenmesi, Redis AOF bozulması, MySQL 8 fiziksel restore, Kafka offset kurtarma, çok kiracılı Docker stack arızaları.',
          'DevOps adayları için teknik işe alım sürecinin tasarımı: şirketin gerçek iç stack’i üzerine kurulu uygulamalı test senaryoları ve değerlendirme adımları.',
        ],
      },
      'inonu-ddo': {
        role: 'Junior DevSecOps Engineer',
        summary: 'Üniversitenin kendi geliştirdiği uygulamalar için CI/CD ve sunucu işletimi.',
        bullets: [
          'Üniversite bünyesinde geliştirilen uygulamaların CI/CD süreçlerinin yönetimi.',
          'Linux uygulama sunucularının, Nginx reverse proxy kurallarının ve iç/dışa açık servisler için TLS sonlandırmanın yapılandırılması.',
          'Uygulama dağıtımı, systemd servis yönetimi, kullanıcı ve yetki yönetimi, temel sunucu sertleştirme.',
          'Dağıtım ve sunucu yapılandırma prosedürlerinin dokümantasyonu — projelerin öğrenci ekipleri arasında sorunsuz devredilebilmesi için.',
        ],
      },
      shiftsoft: {
        role: 'Penetration Testing Intern',
        summary:
          'Yazılım Mühendisliği programının zorunlu yaz stajı; şirketin yazılım güvenliği biriminde.',
        bullets: [
          'Şirketin kendi ürünleri üzerinde sızma testleri: keşif, kimlik doğrulama ve yetkilendirme testleri, OWASP Top 10 ile hizalı yaygın web zafiyet kategorileri.',
          'Bulguların geliştirme ekibine yeniden üretim adımları, etki değerlendirmesi ve düzeltme önerileriyle raporlanması.',
        ],
      },
      'unity-dev': {
        role: 'Kurucu & Yönetici',
        summary:
          'Kurduğum yazılım geliştirme şirketinde hem teslimin hem iş operasyonlarının yürütülmesi.',
        bullets: [
          'Müşteri kazanımı, proje kapsamının belirlenmesi, fiyatlandırma ve teslim taahhütleri.',
          'Geliştirme ekibinin yönetimi: görev dağılımı, kod incelemeleri, sürüm planlaması; junior geliştiricilere versiyon kontrolü ve dağıtım pratiklerinde mentorluk.',
          'Özel web ve uygulama projelerinin gereksinim analizinden dağıtıma kadar uçtan uca teslimi.',
        ],
      },
      rextabi: {
        role: 'Software Engineer',
        summary: 'Java (Spring Boot, JPA) back end ve React front end ile full-stack geliştirme.',
        bullets: [
          'İlişkisel veritabanı şemalarının ve REST API’lerin tasarımı.',
          'Özelliklerin gereksinim analizinden production sürümüne kadar her aşamasının yönetimi.',
        ],
      },
    },
  },

  projects: {
    heading: 'Projeler',
    intro:
      'Hepsi public. Yıldız sayısı ve son güncelleme tarihi sayfa açıldığında GitHub’dan çekilir; ulaşılamazsa son bilinen değer gösterilir.',
    moreHeading: 'Diğer projeler',
    allReposLabel: 'GitHub’daki tüm repolar',
    items: {
      'cheat-sheet': {
        tagline:
          'Local-first pentest çalışma tezgâhı — beklenen çıktısıyla birlikte 5.040 komut, kutu çözme alanı (servisler, kimlik kasası, zaman çizelgesi, üretilen rapor), 16 sınav/lab oturum hazır ayarı ve Markdown write-up editörü. Node ile ya da tamamen tarayıcıda çalışır.',
      },
      'tenant-trace': {
        tagline:
          'Çok kiracılı izolasyon denetçisi — A kiracısının B’nin verisine erişip erişemediğini kanıtlar. İki kiracı oluşturur, birine diğeri gibi davranıp saldırır, doğrulanmış BOLA/IDOR sızıntılarını canary destekli kanıtla raporlar. CI merge kapısı olarak çalışır.',
      },
      'devsecops-handbook': {
        tagline:
          'İki dilli (TR/EN) DevOps · DevSecOps · SRE · Platform Engineering başucu kitabı. 21 konu, 134 deep-dive doküman, ~85K satır, production checklist’leri ve 28 günlük AWS + Terraform + EKS uygulama rehberi — Kubernetes, GitOps, FinOps, Observability, LLMOps, KVKK/GDPR.',
      },
      'databases-stack': {
        tagline:
          'Tek sunucuda 12 veritabanı, tek panelden. Bellek ölçümle boyutlanır, primary düşerse yedek kendiliğinden devralır, yedekler gerçekten geri yüklenerek doğrulanır. Docker Compose + Kubernetes, internal TLS dahil.',
      },
      'pipeline-101-lab': {
        tagline:
          'CI/CD güvenliği uygulama lab’i. İçinde bilerek bırakılmış 5 güvenlik hatası var; hepsini düzeltip karneyi 5/5 yapmak görev.',
      },
      'api-sentinel': {
        tagline:
          '3. parti API’lerin response şema değişikliklerini otomatik tespit eden, severity-aware monitoring sistemi. Plugin tabanlı — alert kanalı, auth ve storage runtime plugin’i. FastAPI + APScheduler + deepdiff.',
      },
      'wakapi-admin': {
        tagline:
          'Self-hosted Wakapi stack’i ve özel Flask admin paneli. Realtime aktif kullanıcılar, domain etiket sistemi, AI editör tespiti (Cursor/Copilot/Claude Code/Codeium), PDF rapor, takım liderlik tablosu; Prometheus + Grafana ile.',
      },
      'goad-light-vmware-windows': {
        tagline:
          'GOAD-Light Active Directory lab’ini VMware Workstation üzerinde (Windows host) kurmak için tam rehber ve düzeltme script’leri. OSCP / AD çalışması için.',
      },
      'file-crypter': {
        tagline:
          'AES-256-CBC + PBKDF2 ile dosya ve klasör şifreleme — terminalden tek komut, Türkçe CLI.',
      },
      'ai-dev-swarm': {
        tagline:
          'Yerel çalışan otonom çok-ajanlı geliştirme sistemi: fikir üretir, planlar, geliştirir ve projeyi GitHub’a kendi gönderir.',
      },
      'living-api-contract-guardian': {
        tagline:
          'İstemci repolarını statik analiz edip kaydedilmiş trafiği yeniden oynatarak fiili API sözleşmelerini çıkaran, her şema farkında evrim kurallarını (eklemeli mi, kırıcı mı) işleten CI servisi.',
      },
      kurulum: {
        tagline:
          'Ubuntu 22.04 üzerinde tek sunuculu (all-in-one) Kubernetes kurulumunun sıfırdan anlatımı.',
      },
      yepaket: {
        tagline:
          'Gün sonunda satılmadan kalan yiyecekleri üçte bir fiyatına buluşturan pazaryeri. Flutter mobil uygulama, React web ve işletme paneli, NestJS API, PostgreSQL + PostGIS.',
      },
      'trafik-analiz': {
        tagline:
          'Sıfırdan eğitilmiş 4 bloklu CNN ile GTSRB veri setinde 43 trafik işaretinin sınıflandırılması — Derin Sinir Ağları ders projesi.',
      },
      RealTimeObjectDetection: {
        tagline:
          'YOLOv8 ile gerçek zamanlı nesne tespiti; özel eğitilmiş model, Angular 18 arayüz ve Flask servis.',
      },
    },
  },

  skills: {
    heading: 'Yetenekler',
    intro: 'Üretimde kullandığım araçlar — kategorilere ayrılmış hâlde.',
    groups: {
      languages: 'Diller',
      platform: 'Altyapı & Platform',
      security: 'Güvenlik',
      observability: 'Gözlemlenebilirlik',
      cicd: 'CI/CD',
      data: 'Veri',
    },
  },

  principles: {
    heading: 'Mühendislik prensipleri',
    intro: 'Bir kararı verirken başvurduğum kısa liste.',
    items: [
      {
        title: 'Self-host, sonra düşün',
        body: 'Bir servisi kendi altyapımda çalıştırmak, onu gerçekten anlamanın en kısa yolu. Arıza anında neye bağlı olduğunuzu ancak o zaman bilirsiniz.',
      },
      {
        title: 'İhtiyacın olan tool’u sen yaz',
        body: 'Hazır çözümün bittiği yer, işin asıl başladığı yer. Bir problemi ikinci kez elle çözüyorsanız, o artık bir araçtır.',
      },
      {
        title: 'Saldırganı tanımayan savunma kâğıt üstünde kalır',
        body: 'Bir kontrolün işe yarayıp yaramadığını ancak saldırgan gibi denediğinizde öğrenirsiniz. Sızma testi, checklist’in doğrulamasıdır.',
      },
      {
        title: 'Her incident bir yazıyı hak eder',
        body: 'Suçlusuz postmortem, güncellenmiş runbook, tekrar edilebilir düzeltme. Yazılmamış olay ikinci kez yaşanır.',
      },
      {
        title: 'Pragmatism > purity',
        body: 'Ekibin kullanmadığı mükemmel pipeline, kullandığı iyi pipeline’dan kötüdür. Benimsenme bir güvenlik özelliğidir.',
      },
    ],
  },

  education: {
    heading: 'Eğitim & Gönüllülük',
    educationLabel: 'Eğitim',
    volunteeringLabel: 'Gönüllülük',
    certificationsLabel: 'Sertifikasyon',
    items: {
      msc: { degree: 'Yüksek Lisans — Yazılım Mühendisliği', note: 'Tezli program' },
      bsc: { degree: 'Lisans — Yazılım Mühendisliği' },
    },
    volunteeringOrg: 'İnönü Üniversitesi Siber Güvenlik Topluluğu',
    volunteeringRoles: {
      member: 'Üye',
      board: 'Yönetim Kurulu Üyesi',
      lead: 'Yönetici',
      handover: 'Uzaktan destek',
    },
    volunteeringNote:
      'Yöneticilik döneminde yıllık etkinlik programını planladım, yönetim kurulunu koordine ettim, topluluğu üniversite içinde temsil ettim ve öğrencilere güvenlik temellerini tanıtan uygulamalı teknik atölyeler yürüttüm. Eylül 2026’da görevi devrettim; topluluğa uzaktan destek vermeyi sürdürüyorum.',
    certifications: [
      { name: 'OSCP+', full: 'OffSec Certified Professional' },
      { name: 'CKS', full: 'Certified Kubernetes Security Specialist' },
    ],
  },

  contact: {
    heading: 'İletişim',
    intro:
      'Uluslararası bir mühendislik ekibinde güvenlik mimarisi rolüne yöneliyorum. Aşağıdaki kanallardan ulaşabilirsiniz.',
    emailLabel: 'E-posta',
    emailPending: 'Yakında eklenecek',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    cvLabel: 'CV (PDF)',
  },

  uses: {
    heading: 'Kullandıklarım',
    intro: 'Günlük işimde dayandığım altyapı ve araçlar.',
    groups: [
      {
        title: 'Altyapı',
        items: [
          { name: 'Proxmox VE', note: 'Self-hosted sanallaştırma; çoklu node, 100+ VM.' },
          { name: 'Docker · Docker Compose', note: 'Neredeyse her iş yükünün paketleme birimi.' },
          { name: 'Kubernetes', note: 'Container orkestrasyonu; kube-bench ile sertleştirme.' },
          { name: 'VMware Workstation', note: 'Active Directory saldırı lab’ları için.' },
          { name: 'Nginx · HAProxy', note: 'Reverse proxy ve TLS sonlandırma.' },
        ],
      },
      {
        title: 'Teslim hattı',
        items: [
          { name: 'GitHub Actions', note: 'Yeniden kullanılabilir workflow’lar, BuildKit cache.' },
          { name: 'Argo CD', note: 'GitOps ile dağıtım.' },
          { name: 'Terraform · Ansible', note: 'Altyapı ve yapılandırma kodu.' },
        ],
      },
      {
        title: 'Güvenlik',
        items: [
          { name: 'Trivy', note: 'Container imaj ve bağımlılık taraması.' },
          { name: 'Semgrep', note: 'SAST; pipeline’a merge kapısı olarak bağlı.' },
          { name: 'HashiCorp Vault', note: 'Merkezî secret yönetimi.' },
          { name: 'Cosign', note: 'İmaj imzalama ve doğrulama.' },
        ],
      },
      {
        title: 'Gözlemlenebilirlik',
        items: [
          { name: 'Prometheus · Grafana', note: 'Metrik ve gösterge panelleri.' },
          { name: 'ELK', note: 'Merkezî log.' },
          { name: 'Sentry', note: 'Uygulama hata takibi.' },
          { name: 'Wakapi (self-hosted)', note: 'Kendi kodlama zamanı analitiğim.' },
        ],
      },
    ],
  },

  notFound: {
    code: '404',
    title: 'Sayfa bulunamadı',
    body: 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.',
  },

  footer: {
    builtWith: 'Astro ve Tailwind ile yapıldı. Üçüncü parti analitik yok, çerez yok.',
    sourceLabel: 'Kaynak kodu',
    rights: 'Halil İbrahim Dürmüş',
  },
} as const satisfies Content<ExperienceId, ProjectId, SkillGroupId, EducationId, VolunteeringId>;
