import type { Localized } from '@/i18n/config';

/** French and Arabic content in this file has not been reviewed yet. */
export const _reviewed = { fr: 'no', ar: 'no' } as const;

export interface Profile {
  name: Localized;
  initials: string;
  headline: Localized;
  tagline: Localized;
  location: Localized;
  /** Postal locality and country code for JSON-LD. */
  address: { locality: string; country: string };
  availabilityShort: Localized;
  availability: Localized;
  about: Localized<string[]>;
  languages: { code: string; name: Localized; level: Localized }[];
  email: string;
  links: { linkedin: string; github: string };
  /** Repository that holds this site's source. */
  sourceRepo: string;
}

export const profile: Profile = {
  name: {
    en: 'Wassim Marouani',
    fr: 'Wassim Marouani',
    ar: 'وسيم مرواني',
  },
  initials: 'WM',
  headline: {
    en: 'Full-stack developer · Business intelligence & data engineering',
    fr: 'Développeur full-stack · Business intelligence et ingénierie des données',
    ar: 'مطوّر Full-Stack · ذكاء الأعمال وهندسة البيانات',
  },
  tagline: {
    en: 'I build web applications end-to-end and turn business data into decisions.',
    fr: 'Je construis des applications web de bout en bout et je transforme les données de l’entreprise en décisions.',
    ar: 'أبني تطبيقات الويب من البداية إلى النهاية، وأحوّل بيانات الأعمال إلى قرارات.',
  },
  location: { en: 'Sfax, Tunisia', fr: 'Sfax, Tunisie', ar: 'صفاقس، تونس' },
  address: { locality: 'Sfax', country: 'TN' },
  availabilityShort: {
    en: 'Open to full-time roles in Europe or remote · Available for freelance',
    fr: 'Ouvert à un poste à temps plein en Europe ou en télétravail · Disponible en freelance',
    ar: 'متاح لوظيفة بدوام كامل في أوروبا أو عن بُعد · متاح للعمل الحر',
  },
  availability: {
    en: 'Open to full-time roles as a full-stack, backend or BI developer, or as a data engineer: on-site in Europe with relocation, or fully remote. Also available for freelance projects. I study in evening classes, so I’m available full-time during the day.',
    fr: 'Ouvert à un poste à temps plein de développeur full-stack, backend ou BI, ou de data engineer : sur site en Europe avec relocalisation, ou en télétravail complet. Également disponible pour des missions freelance. Je suis mes cours en soirée, je suis donc disponible à temps plein en journée.',
    ar: 'متاح لوظيفة بدوام كامل كمطوّر Full-Stack أو Backend أو BI، أو كمهندس بيانات: حضورياً في أوروبا مع الانتقال، أو عن بُعد بالكامل. ومتاح أيضاً لمشاريع العمل الحر. أدرس في الفترة المسائية، لذا أنا متفرّغ بدوام كامل خلال النهار.',
  },
  about: {
    en: [
      'I’m a full-stack developer with a Business Intelligence background. On the front end I work with React and Angular; on the back end with NestJS, Node.js and ASP.NET Core; for data with Prisma, Entity Framework Core, PostgreSQL and SQL Server. On the analytics side I design ETL pipelines, model data warehouses, and build SSAS cubes and Power BI dashboards that people actually use.',
      'For the past two years I’ve also worked on the commercial side of tech, running international e-commerce across Amazon, Etsy and our own B2B and B2C sites: market and product research, SEO, paid advertising. It taught me what engineers often miss: what a business actually needs from its software, and what a dashboard is really for. I bring that back to the engineering seat.',
    ],
    fr: [
      'Je suis développeur full-stack, avec une formation en Business Intelligence. Côté front, je travaille avec React et Angular ; côté back, avec NestJS, Node.js et ASP.NET Core ; côté données, avec Prisma, Entity Framework Core, PostgreSQL et SQL Server. Côté analytique, je conçois des pipelines ETL, je modélise des entrepôts de données et je construis des cubes SSAS et des tableaux de bord Power BI réellement utilisés.',
      'Depuis deux ans, je travaille aussi du côté commercial de la tech : je pilote un e-commerce international sur Amazon, Etsy et nos propres sites B2B et B2C (études de marché et de produits, SEO, publicité payante). J’y ai appris ce qui échappe souvent aux ingénieurs : ce dont une entreprise a réellement besoin de son logiciel, et à quoi sert vraiment un tableau de bord. C’est ce regard que j’apporte au développement.',
    ],
    ar: [
      'أنا مطوّر Full-Stack بخلفية في ذكاء الأعمال. أعمل في الواجهة الأمامية بـ React وAngular، وفي الواجهة الخلفية بـ NestJS وNode.js وASP.NET Core، ومع البيانات بـ Prisma وEntity Framework Core وPostgreSQL وSQL Server. وفي جانب التحليل، أصمّم مسارات ETL، وأنمذج مستودعات البيانات، وأبني مكعّبات SSAS ولوحات Power BI تُستخدم فعلاً.',
      'منذ عامين أعمل أيضاً في الجانب التجاري من التقنية، إذ أدير تجارة إلكترونية دولية عبر Amazon وEtsy ومواقعنا الخاصة B2B وB2C: دراسة السوق والمنتجات، وتحسين الظهور في محركات البحث (SEO)، والإعلانات المدفوعة. تعلّمت من ذلك ما يغيب غالباً عن المهندسين: ما الذي تحتاجه الشركة فعلاً من برمجياتها، وما الغاية الحقيقية من لوحة المؤشرات. وهذا ما أعود به إلى مقعد المطوّر.',
    ],
  },
  languages: [
    { code: 'ar', name: { en: 'Arabic', fr: 'Arabe', ar: 'العربية' }, level: { en: 'Native', fr: 'Langue maternelle', ar: 'اللغة الأم' } },
    { code: 'fr', name: { en: 'French', fr: 'Français', ar: 'الفرنسية' }, level: { en: 'B2', fr: 'B2', ar: 'B2' } },
    { code: 'en', name: { en: 'English', fr: 'Anglais', ar: 'الإنجليزية' }, level: { en: 'B2', fr: 'B2', ar: 'B2' } },
  ],
  email: 'wassimmarweni.sfax@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/wassimmarouani',
    github: 'https://github.com/wassimmarouani',
  },
  sourceRepo: 'https://github.com/wassimmarouani/wassimmarouani.github.io',
};
