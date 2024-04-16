/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { AboutCourseSection } from '../AboutCourseSection/AboutCourseSection';

import { ICourse, TaskStatus } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';
import styles from './MyCourseCard.module.scss';

type Props = {
  course: ICourse;
};

export const MyCourseCard: React.FC<Props> = ({ course }) => {
  const { courseTasks } = course;
  const dispatch = useAppDispatch();

  const handleCheckboxClick = () => {
    dispatch(coursesActions.deleteCourse(course.id));
  };

  return (
    <div className={styles.container}>
      <AboutCourseSection course={course} />

      <div className={styles.tasksSection}>
        <div className={styles.tasks}>
          <p className={styles.subtitle}>Tasks:</p>

          <ul className={styles.list}>
            {courseTasks.map(({ taskDescription, taskId, status }) => (
              <li
                className={styles.item}
                key={taskId}
              >
                <input
                  id={String(taskId)}
                  name={taskDescription}
                  type="checkbox"
                  checked={status === TaskStatus.DONE}
                  className={styles.input}
                  onClick={handleCheckboxClick}
                />
                <label
                  htmlFor={String(taskId)}
                  className={styles.label}
                >
                  {taskDescription}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <Link
          className={styles.seeAllLink}
          to="taskid"
        >
          See all
        </Link>
      </div>
    </div>
  );
};
