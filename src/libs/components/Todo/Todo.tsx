import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UpdatedTaskData, ICourseTask, TaskStatus } from '../../types';

import { useAppDispatch } from '../../app/hooks';
import * as tasksAction from '../../slices/tasksSlice';
import styles from './Todo.module.scss';

type Props = {
  task: ICourseTask;
  currentCourseId: number;
};

export const Todo: React.FC<Props> = ({
  task: { id, status, taskName },
  currentCourseId,
}) => {
  const dispatch = useAppDispatch();
  const [isUpdatingTodoTitle, setIsUpdatingTodoTitle] = useState(false);

  const toggleChecked = async () => {
    await dispatch(
      tasksAction.updateCurrentTask({
        status:
          status === TaskStatus.DONE ? TaskStatus.IN_PROGRESS : TaskStatus.DONE,
        taskName,
        id,
      }),
    );
  };

  const { handleSubmit, register } = useForm<UpdatedTaskData>();

  const onSubmit = async (updatedTask: UpdatedTaskData) => {
    if (!updatedTask.taskName.trim()) {
      setIsUpdatingTodoTitle(false);
      return;
    }

    await dispatch(
      tasksAction.updateCurrentTask({
        status,
        taskName: updatedTask.taskName.trim(),
        id,
      }),
    );

    setIsUpdatingTodoTitle(false);
  };

  const deleteCurrentTodo = () => {
    dispatch(
      tasksAction.deleteCurrentTask({
        id,
        courseId: currentCourseId,
      }),
    );
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={status === TaskStatus.DONE}
        onChange={toggleChecked}
      />

      {isUpdatingTodoTitle ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          onBlur={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className={styles.input}
            {...register('taskName')}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => setIsUpdatingTodoTitle(true)}
            className={styles.taskName}
          >
            {taskName}
          </span>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={deleteCurrentTodo}
          >
            ×
          </button>
        </>
      )}
    </div>
  );
};
