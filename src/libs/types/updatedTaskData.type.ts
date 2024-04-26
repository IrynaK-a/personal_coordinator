import { ICourseTask } from './courseTasks.interface';

export type UpdatedTaskData = Pick<ICourseTask, 'taskName' | 'status' | 'id'>;
