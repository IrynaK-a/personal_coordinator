import { ICourseTasks } from './courseTasks.interface';

export type UpdatedTaskData = Pick<ICourseTasks, 'taskName' | 'status' | 'id'>;
