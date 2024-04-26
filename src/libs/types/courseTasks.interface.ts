import { TaskStatus } from './taskStatus.enum';
import { ValueOf } from './valueOf.type';

export interface ICourseTask {
  id: number;
  courseId: number;
  taskName: string;
  status: ValueOf<typeof TaskStatus>;
}
