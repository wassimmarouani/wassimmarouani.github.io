import type { Localized, MaybeLocalized } from '@/i18n/config';
import type { IconName } from '@/components/icons';

/** French and Arabic content in this file has not been reviewed yet. */
export const _reviewed = { fr: 'no', ar: 'no' } as const;

export interface SkillGroup {
  id: string;
  title: Localized;
  icon: IconName;
  items: MaybeLocalized[];
}

export const skills: SkillGroup[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', fr: 'Frontend', ar: 'الواجهة الأمامية' },
    icon: 'layout',
    items: ['React', 'Angular', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    id: 'backend',
    title: { en: 'Backend', fr: 'Backend', ar: 'الواجهة الخلفية' },
    icon: 'server',
    items: [
      'NestJS',
      'Node.js',
      'ASP.NET Core Web API',
      'Laravel',
      'Symfony',
      'Java (Servlets/JSP)',
      'Prisma',
      'TypeORM',
      'Entity Framework Core',
      'PHP',
      'REST APIs',
    ],
  },
  {
    id: 'databases',
    title: { en: 'Databases', fr: 'Bases de données', ar: 'قواعد البيانات' },
    icon: 'database',
    items: ['PostgreSQL', 'SQL Server', 'MySQL'],
  },
  {
    id: 'data-bi',
    title: { en: 'Data & BI', fr: 'Data et BI', ar: 'البيانات وذكاء الأعمال' },
    icon: 'chart',
    items: [
      'ETL',
      'SSIS',
      { en: 'Data warehousing', fr: 'Entrepôts de données', ar: 'مستودعات البيانات' },
      'SSAS',
      'OLAP',
      'MDX',
      'Power BI',
      { en: 'Statistical data analysis', fr: 'Analyse statistique des données', ar: 'التحليل الإحصائي للبيانات' },
    ],
  },
  {
    id: 'ecommerce',
    title: { en: 'E-commerce & growth', fr: 'E-commerce et croissance', ar: 'التجارة الإلكترونية والنمو' },
    icon: 'cart',
    items: [
      'WordPress',
      'Stripe',
      'SEO',
      'SSR & Schema.org',
      'GA4',
      'Search Console',
      'Amazon FBA',
      'Etsy',
      'Meta Ads',
      'Google Ads',
      { en: 'Email marketing', fr: 'E-mail marketing', ar: 'التسويق عبر البريد الإلكتروني' },
    ],
  },
  {
    id: 'practices',
    title: { en: 'Practices & tools', fr: 'Pratiques et outils', ar: 'الممارسات والأدوات' },
    icon: 'wrench',
    items: [
      'Git & GitHub',
      'Agile/Scrum',
      { en: 'Automated testing (Vitest, xUnit)', fr: 'Tests automatisés (Vitest, xUnit)', ar: 'الاختبارات الآلية (Vitest، xUnit)' },
      { en: 'Responsive design', fr: 'Design responsive', ar: 'التصميم المتجاوب' },
      { en: 'WCAG accessibility', fr: 'Accessibilité WCAG', ar: 'إمكانية الوصول وفق WCAG' },
    ],
  },
];
