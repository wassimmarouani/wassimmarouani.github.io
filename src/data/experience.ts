import type { Localized } from '@/i18n/config';

/** French and Arabic content in this file has not been reviewed yet. */
export const _reviewed = { fr: 'no', ar: 'no' } as const;

export interface Role {
  id: string;
  title: Localized;
  company: string;
  companyNote?: Localized;
  location: Localized;
  type: 'full-time' | 'internship';
  /** ISO year-month. */
  start: string;
  /** ISO year-month, or undefined while ongoing. */
  end?: string;
  bullets: Localized<string[]>;
  tools: string[];
}

const sfax: Localized = { en: 'Sfax, Tunisia', fr: 'Sfax, Tunisie', ar: 'صفاقس، تونس' };

/** Most recent first. */
export const experience: Role[] = [
  {
    id: 'artisraw',
    title: {
      en: 'Full-stack developer & e-commerce data analyst',
      fr: 'Développeur full-stack et analyste de données e-commerce',
      ar: 'مطوّر Full-Stack ومحلّل بيانات التجارة الإلكترونية',
    },
    company: 'ArtisRaw',
    companyNote: {
      en: 'Olive-wood products manufacturer selling internationally (B2C and B2B).',
      fr: 'Fabricant d’articles en bois d’olivier vendant à l’international (B2C et B2B).',
      ar: 'مصنّع لمنتجات خشب الزيتون يبيع على المستوى الدولي (B2C وB2B).',
    },
    location: sfax,
    type: 'full-time',
    start: '2024-11',
    bullets: {
      en: [
        'Designed and built the company’s B2B platform (b2b.artisraw.com) from scratch in React: product catalog, category landing pages, and a qualifying quote-request workflow (volume, market, channel) with automated lead routing and WhatsApp Business integration.',
        'Implemented server-side rendering with Schema.org structured data for SEO, fully responsive layouts (360–1920 px) with WCAG AA accessibility, and performance work (WebP, lazy-loading, CDN, caching) targeting Core Web Vitals (LCP < 2.5 s).',
        'Built the B2C store (WordPress, Stripe international payments) and set up GA4 and Search Console conversion tracking, plus GDPR-compliant cookie and legal flows.',
        'Launched the Amazon FBA business from scratch (account setup, product research, listings, SEO) to about 30 orders a day. Own inventory planning, from stock forecasting to 4-month FBA shipment cycles to US fulfillment centers.',
        'Manage 3+ Amazon and Etsy shops, the Meta Ads and Google Ads strategy, and 3 email campaigns a week. Build Power BI reports on sales, ads and inventory to support pricing and stock decisions.',
      ],
      fr: [
        'Conception et développement de zéro de la plateforme B2B de l’entreprise (b2b.artisraw.com) en React : catalogue produits, pages d’atterrissage par catégorie et parcours de demande de devis qualifiant (volume, marché, canal) avec routage automatique des leads et intégration WhatsApp Business.',
        'Mise en place du rendu côté serveur avec données structurées Schema.org pour le SEO, de mises en page entièrement responsives (360–1920 px) conformes WCAG AA, et optimisation des performances (WebP, lazy-loading, CDN, cache) visant les Core Web Vitals (LCP < 2,5 s).',
        'Réalisation de la boutique B2C (WordPress, paiements internationaux Stripe), mise en place du suivi des conversions GA4 et Search Console, et des parcours cookies et mentions légales conformes au RGPD.',
        'Lancement de l’activité Amazon FBA de zéro (création du compte, recherche produits, fiches, SEO) jusqu’à environ 30 commandes par jour. Responsable de la planification des stocks, des prévisions aux cycles d’expédition FBA de 4 mois vers les entrepôts américains.',
        'Gestion de plus de 3 boutiques Amazon et Etsy, de la stratégie Meta Ads et Google Ads, et de 3 campagnes e-mail par semaine. Création de rapports Power BI sur les ventes, la publicité et les stocks pour éclairer les décisions de prix et d’approvisionnement.',
      ],
      ar: [
        'صمّمت وبنيت منصة B2B الخاصة بالشركة (b2b.artisraw.com) من الصفر باستخدام React: كتالوج المنتجات، وصفحات هبوط لكل فئة، ومسار لطلب عروض الأسعار يؤهّل العملاء (الحجم، السوق، القناة) مع توجيه آلي للعملاء المحتملين وتكامل مع WhatsApp Business.',
        'نفّذت العرض من جهة الخادم مع بيانات Schema.org المنظّمة لتحسين الظهور في محركات البحث، وتصاميم متجاوبة بالكامل (360–1920 px) مطابقة لمعيار WCAG AA، وتحسينات للأداء (WebP، التحميل الكسول، CDN، التخزين المؤقت) تستهدف مؤشرات Core Web Vitals (LCP < 2.5 ث).',
        'بنيت متجر B2C (WordPress، مدفوعات دولية عبر Stripe)، وأعددت تتبّع التحويلات عبر GA4 وSearch Console، ومسارات ملفات تعريف الارتباط والصفحات القانونية المتوافقة مع GDPR.',
        'أطلقت نشاط Amazon FBA من الصفر (إعداد الحساب، البحث عن المنتجات، صفحات المنتجات، SEO) حتى بلغ نحو 30 طلباً يومياً. وأتولّى تخطيط المخزون، من التنبؤ بالطلب إلى دورات شحن FBA كل 4 أشهر نحو مراكز التوزيع في الولايات المتحدة.',
        'أدير أكثر من 3 متاجر على Amazon وEtsy، واستراتيجية إعلانات Meta Ads وGoogle Ads، و3 حملات بريد إلكتروني أسبوعياً. وأبني تقارير Power BI حول المبيعات والإعلانات والمخزون لدعم قرارات التسعير والتخزين.',
      ],
    },
    tools: ['React', 'SSR', 'WordPress', 'PHP', 'Stripe', 'Power BI', 'Excel', 'GA4', 'Search Console', 'Amazon Seller Central', 'Etsy'],
  },
  {
    id: 'mim-groupe',
    title: {
      en: 'Marketing & web developer',
      fr: 'Développeur web et marketing',
      ar: 'مطوّر ويب ومسؤول تسويق',
    },
    company: 'MIM Groupe',
    location: sfax,
    type: 'full-time',
    start: '2023-10',
    end: '2024-04',
    bullets: {
      en: [
        'Designed and launched an e-commerce platform for automotive spare parts (WordPress), with custom themes and plugins built for the client’s catalogue and ordering workflow.',
        'Handled product cataloguing, on-site SEO and the digital marketing operations supporting the store.',
      ],
      fr: [
        'Conception et lancement d’une plateforme e-commerce de pièces détachées automobiles (WordPress), avec thèmes et plugins sur mesure adaptés au catalogue et au processus de commande du client.',
        'Prise en charge du catalogage des produits, du SEO on-site et des opérations de marketing digital de la boutique.',
      ],
      ar: [
        'صمّمت وأطلقت منصة تجارة إلكترونية لقطع غيار السيارات (WordPress)، مع قوالب وإضافات مخصّصة تلائم كتالوج العميل ومسار الطلبات لديه.',
        'تولّيت فهرسة المنتجات، وتحسين SEO داخل الموقع، وعمليات التسويق الرقمي الداعمة للمتجر.',
      ],
    },
    tools: ['WordPress', 'PHP', 'MySQL', 'SEO'],
  },
  {
    id: 'jalysscom',
    title: {
      en: 'Full-stack developer intern (end-of-studies project)',
      fr: 'Stagiaire développeur full-stack (projet de fin d’études)',
      ar: 'متربّص مطوّر Full-Stack (مشروع ختم الدروس)',
    },
    company: 'Jalysscom',
    location: sfax,
    type: 'internship',
    start: '2023-02',
    end: '2023-04',
    bullets: {
      en: [
        'Built a complete book-sales and workspace-reservation platform end-to-end: data model, business logic and REST APIs, a customer-facing React store (catalogue, cart, accounts, order flow, payment options), an admin back-office, and a real-time analytics dashboard.',
        'Owned the UI/UX design. The platform went live and became the company’s first online sales channel.',
      ],
      fr: [
        'Développement de bout en bout d’une plateforme complète de vente de livres et de réservation d’espaces de travail : modèle de données, logique métier et API REST, boutique client en React (catalogue, panier, comptes, parcours de commande, options de paiement), back-office d’administration et tableau de bord analytique en temps réel.',
        'Responsable du design UI/UX. La plateforme a été mise en ligne et est devenue le premier canal de vente en ligne de l’entreprise.',
      ],
      ar: [
        'بنيت منصة متكاملة لبيع الكتب وحجز مساحات العمل من البداية إلى النهاية: نموذج البيانات، ومنطق الأعمال وواجهات REST API، ومتجر للعملاء بـ React (الكتالوج، السلة، الحسابات، مسار الطلب، خيارات الدفع)، ولوحة إدارة، ولوحة تحليلات فورية.',
        'تولّيت تصميم واجهة المستخدم وتجربته (UI/UX). أُطلقت المنصة فعلياً وأصبحت أول قناة بيع إلكترونية للشركة.',
      ],
    },
    tools: ['React.js', 'JavaScript', 'REST APIs', 'SQL', 'HTML/CSS'],
  },
];
