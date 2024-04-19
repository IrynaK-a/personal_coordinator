import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import cn from 'classnames';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { ReactComponent as TasksIcon } from '../../../assets/icons/tasks.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AboutCourseSection } from '../../components/AboutCourseSection';

import * as coursesActions from '../../slices/coursesSlice';
import { DataStatus } from '../../types';
import { Loader } from '../../components';

import styles from './CoursePage.module.scss';

export const CoursePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { currentCourse, currentCoursesRequestStatus, hasError } =
    useAppSelector(state => state.courses);
  const [newTask, setNewTask] = useState('');

  const isLoading = currentCoursesRequestStatus === DataStatus.PENDING;
  const hasCurrent = !isLoading && currentCourse && !hasError;

  const addNewTask = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCurrent(+id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {hasCurrent && (
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
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
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
            <div className={styles.tasksContainer} />
          </section>
        </>
      )}
    </div>
  );
};
