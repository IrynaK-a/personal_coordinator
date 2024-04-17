/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ICourse } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';
import styles from './AboutCourseSection.module.scss';

type Props = {
  course?: ICourse;
};

export const AboutCourseSection: React.FC<Props> = ({ course }) => {
  const dispatch = useAppDispatch();
  const [isTitleChanging, setIsTitleChanging] = useState(!course);

  const date = course && new Date(course.startDate).toLocaleDateString('uk-UA');

  const handleDelete = () => {
    if (course) {
      dispatch(coursesActions.deleteCourse(course.id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isTitleChanging ? (
          <input
            type="text"
            className={styles.titleInput}
          />
        ) : (
          <h2
            className={styles.title}
            onDoubleClick={() => setIsTitleChanging(true)}
          >
            {course?.name ?? 'Course name'}
          </h2>
        )}

        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDelete}
        >
          <DeleteIcon className={styles.deleteIcon} />
        </button>
      </div>

      <Link
        to={course?.link ?? '/my-courses'}
        className={styles.link}
      >
        link
      </Link>

      {course && <span className={styles.startDay}>{date}</span>}
    </div>
  );
};
