/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';

import { ICourse, TaskStatus } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';
import styles from './MyCourseCard.module.scss';
import { Loader } from '../Loader';

type Props = {
  course: ICourse;
};

export const MyCourseCard: React.FC<Props> = ({ course }) => {
  const { courseTasks, startDate, id, name } = course;
  const dispatch = useAppDispatch();
  const hasTasks = Boolean(courseTasks.length);
  const date = new Date(startDate).toLocaleDateString('uk-UA');
  const [isDeleting, setIsDeliting] = useState(false);

  const handleDelete = () => {
    setIsDeliting(true);
    dispatch(coursesActions.deleteCourse(id));
  };

  const handleCheckboxClick = () => {};

  return (
    <div className={styles.container}>
      {isDeleting ? (
        <Loader />
      ) : (
        <>
          <div className={styles.aboutSection}>
            <div className={styles.header}>
              <Link
                to={`${id}`}
                className={styles.title}
              >
                {name}
              </Link>

              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                <DeleteIcon className={styles.deleteIcon} />
              </button>
            </div>

            <span className={styles.startDay}>{date}</span>
          </div>

          <div className={styles.tasksSection}>
            {hasTasks && (
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
            )}

            <Link
              to={`${id}`}
              className={styles.seeAllLink}
            >
              {`See ${hasTasks ? 'all' : 'more'}`}
            </Link>
          </div>
        </>
      )}
    </div>
  );
};
