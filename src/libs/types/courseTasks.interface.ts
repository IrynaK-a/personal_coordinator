import { TaskStatus } from './taskStatus.enum';
import { ValueOf } from './valueOf.type';

export interface ICourseTasks {
  id: number;
  taskId: number;
  taskName: string;
  taskDescription: string;
  status: ValueOf<typeof TaskStatus>;
}
