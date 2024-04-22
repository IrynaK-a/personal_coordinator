import { ICourse } from './course.interface';

export type ChangeCourseData = Pick<
  ICourse,
  'link' | 'name' | 'status' | 'description'
>;
