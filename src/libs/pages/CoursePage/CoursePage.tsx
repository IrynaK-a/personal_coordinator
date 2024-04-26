import { useEffect } from 'react';
import { useParams } from 'react-router';
import cn from 'classnames';

import { ReactComponent as TasksIcon } from '../../../assets/icons/tasks.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AboutCourseSection } from '../../components/AboutCourseSection';

import * as coursesActions from '../../slices/coursesSlice';
import { DataStatus } from '../../types';
import { CreateTaskBar, Loader, Todo } from '../../components';

import styles from './CoursePage.module.scss';

export const CoursePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { currentCourse, currentCoursesRequestStatus, hasError } =
    useAppSelector(state => state.courses);
  const { currentTasks } = useAppSelector(state => state.tasks);

  const isCourseLoading = currentCoursesRequestStatus === DataStatus.PENDING;
  const hasCurrentCourse = !isCourseLoading && currentCourse && !hasError;
  const hasCourses = Boolean(currentTasks.length);

  useEffect(() => {
    if (id) {
      dispatch(coursesActions.getCurrent(+id));
    }
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {isCourseLoading && <Loader />}
      {hasCurrentCourse && (
        <>
          <div className={styles.mainInfo}>
            <AboutCourseSection course={currentCourse} />
          </div>

          <CreateTaskBar />

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
                currentTasks.map(task => (
                  <Todo
                    task={task}
                    key={task.id}
                    currentCourseId={currentCourse.id}
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
