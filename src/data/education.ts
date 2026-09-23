import type { Localized } from '@/i18n/config';

/** French and Arabic content in this file has not been reviewed yet. */
export const _reviewed = { fr: 'no', ar: 'no' } as const;

export interface Degree {
  id: string;
  degree: Localized;
  school: Localized;
  /** Years as shown; `end` is omitted for single-year entries. */
  start?: number;
  end: number;
  inProgress?: boolean;
  note?: Localized;
}

/** Most recent first. */
export const education: Degree[] = [
  {
    id: 'engineering',
    degree: {
      en: 'Engineer’s degree, Computer engineering',
      fr: 'Diplôme d’ingénieur, génie informatique',
      ar: 'شهادة مهندس في هندسة الإعلامية',
    },
    school: {
      en: 'International Institute of Technology, Sfax',
      fr: 'International Institute of Technology, Sfax',
      ar: 'المعهد الدولي للتكنولوجيا بصفاقس',
    },
    start: 2024,
    end: 2027,
    inProgress: true,
    note: {
      en: 'Evening classes',
      fr: 'Cours du soir',
      ar: 'دروس مسائية',
    },
  },
  {
    id: 'bachelor',
    degree: {
      en: 'Bachelor’s degree, Management information systems – Business intelligence',
      fr: 'Licence en systèmes d’information de gestion – Business Intelligence',
      ar: 'إجازة في نظم المعلومات الإدارية – ذكاء الأعمال',
    },
    school: {
      en: 'Higher Institute of Industrial Management of Sfax',
      fr: 'Institut supérieur de gestion industrielle de Sfax',
      ar: 'المعهد العالي للتصرّف الصناعي بصفاقس',
    },
    start: 2020,
    end: 2023,
  },
  {
    id: 'baccalaureate',
    degree: {
      en: 'Baccalaureate, Computer science',
      fr: 'Baccalauréat, section informatique',
      ar: 'شهادة الباكالوريا، شعبة علوم الإعلامية',
    },
    school: {
      en: 'Hedi Chaker High School',
      fr: 'Lycée Hédi Chaker',
      ar: 'معهد الهادي شاكر',
    },
    end: 2020,
  },
];
