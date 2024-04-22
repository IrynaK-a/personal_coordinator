import { useState } from 'react';
import { ICourseTasks, TaskStatus } from '../../types';

import { useAppDispatch } from '../../app/hooks';
import * as tasksAction from '../../slices/tasksSlice';
import styles from './Todo.module.scss';

type Props = {
  task: ICourseTasks;
};

export const Todo: React.FC<Props> = ({
  task: { id, status, taskName: name },
}) => {
  const dispatch = useAppDispatch();
  const [isUpdatingTodoTitle, setIsUpdatingTodoTitle] = useState(false);
  const [newTask, setNewTask] = useState(name);

  const toggleChecked = () => {};

  const handleFormSubmit = () => {
    setIsUpdatingTodoTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const deleteCurrentTodo = () => {
    dispatch(tasksAction.deleteCurrentTask(id));
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
          onSubmit={handleFormSubmit}
          className={styles.form}
        >
          <input
            type="text"
            value={newTask}
            onChange={handleTitleChange}
            onBlur={handleFormSubmit}
            className={styles.input}
          />
        </form>
      ) : (
        <>
          <span
            onDoubleClick={() => setIsUpdatingTodoTitle(true)}
            className={styles.taskName}
          >
            {name}
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
