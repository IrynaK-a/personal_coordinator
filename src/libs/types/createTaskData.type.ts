import { ICourseTasks } from './courseTasks.interface';

export type CreateTaskData = Pick<ICourseTasks, 'courseId' | 'taskName'>;
