/* eslint-disable max-len */
export interface ICourses {
  id: string;
  image?: string;
  title: string;
  description: string;
  link: string;
}

export const COURSES: ICourses[] = [
  {
    id: '1',
    title: 'Weeknight Meals',
    description:
      'Test Kitchen instructors explain the secrets to better food. Learn to cook with confidence, with or without recipes.',
    link: 'link.com',
  },
  {
    id: '2',
    title: 'Essential Eggs',
    description:
      'Eggs are one of the most versatile foods in our supermarkets, and one of the most cost-effective proteins out there.',
    link: 'link.com',
  },
  {
    id: '3',
    title: 'Thai Dinners',
    description:
      'Thai food is a popular option for takeout, but the results can be disappointing: lackluster flavors and sticky sauce can easily ruin pad Thai.',
    link: 'link.com',
  },
  {
    id: '4',
    title: 'Weeknight Meals',
    description:
      'Test Kitchen instructors explain the secrets to better food. Learn to cook with confidence, with or without recipes.',
    link: 'link.com',
  },
  {
    id: '5',
    title: 'Thai Dinners',
    description:
      'Thai food is a popular option for takeout, but the results can be disappointing: lackluster flavors and sticky sauce can easily ruin pad Thai.',
    link: 'link.com',
  },
];
