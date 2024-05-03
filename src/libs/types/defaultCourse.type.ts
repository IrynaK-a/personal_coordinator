import { ICourse } from './course.interface';

export type DefaultCourse = Pick<
  ICourse,
  'id' | 'name' | 'description' | 'image' | 'link'
>;
