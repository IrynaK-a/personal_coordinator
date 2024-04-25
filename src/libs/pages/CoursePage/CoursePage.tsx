import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cn from 'classnames';

import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/tasks.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AboutCourseSection } from '../../components/AboutCourseSection';

import * as coursesActions from '../../slices/coursesSlice';
import * as tasksActions from '../../slices/tasksSlice';
import { CreateTaskData, DataStatus } from '../../types';
import { Loader, Todo } from '../../components';

import styles from './CoursePage.module.scss';

export const CoursePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { currentCourse, currentCoursesRequestStatus, hasError } =
    useAppSelector(state => state.courses);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const isCOurseLoading = currentCoursesRequestStatus === DataStatus.PENDING;
  const hasCurrentCourse = !isCOurseLoading && currentCourse && !hasError;
  const hasCourses = Boolean(
    currentCourse &&
      currentCourse.courseTasks &&
      currentCourse.courseTasks.length,
  );

  const addNewTask = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (!currentCourse || !newTaskTitle.trim()) {
      return;
    }

    const newTask: CreateTaskData = {
      courseId: currentCourse.id,
      taskName: newTaskTitle,
    };

    await dispatch(tasksActions.createTask(newTask));
    setNewTaskTitle('');
  };

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCurrent(+id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {isCOurseLoading && <Loader />}
      {hasCurrentCourse && (
        <>
          <div className={styles.mainInfo}>
            <AboutCourseSection course={currentCourse} />
          </div>

          <form
            className={styles.addTaskForm}
            onSubmit={addNewTask}
          >
            <PlusIcon
              className={styles.plusIcon}
              onClick={() => addNewTask()}
            />

            <input
              type="text"
              className={styles.addTaskInput}
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              placeholder="Add task"
            />
          </form>

          <section className={styles.tasksSection}>
            <div className={styles.tasksTitleSection}>
              {currentCourse.image && (
                <img
                  src={currentCourse.image}
                  alt={currentCourse.name}
                  className={styles.courseImage}
                />
              )}

              <TasksIcon
                className={cn(styles.tasksTitleIcon, {
                  [styles.tasksTitleIconMobile]: currentCourse.image,
                })}
              />

              <h3 className={styles.tasksTitle}>Tasks</h3>
            </div>

            <div className={styles.tasksContainer}>
              {hasCourses ? (
                currentCourse.courseTasks.map(task => (
                  <Todo
                    task={task}
                    key={task.id}
                  />
                ))
              ) : (
                <p className={styles.noTasksInfo}>There are no tasks yet</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
