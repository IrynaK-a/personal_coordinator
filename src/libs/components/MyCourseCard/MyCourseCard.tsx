/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { AboutCourseSection } from '../AboutCourseSection/AboutCourseSection';

import styles from './MyCourseCard.module.scss';
import { ICourse } from '../../types';

type Props = {
  course: ICourse;
};

export const MyCourseCard: React.FC<Props> = ({ course }) => {
  const { courseTasks } = course;
  return (
    <div className={styles.container}>
      <AboutCourseSection course={course} />

      <div className={styles.tasksSection}>
        <div className={styles.tasks}>
          <p className={styles.subtitle}>Tasks:</p>

          <ul className={styles.list}>
            {courseTasks.map(({ taskDescription, taskId }) => (
              <li
                className={styles.item}
                key={taskId}
              >
                <input
                  id={String(taskId)}
                  name={taskDescription}
                  type="checkbox"
                  className={styles.input}
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
