/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import styles from './AboutCourseSection.module.scss';
import { ICourse } from '../../types';

type Props = {
  course: ICourse;
};

export const AboutCourseSection: React.FC<Props> = ({
  course: { id, startDate, name, link },
}) => {
  const date = new Date(startDate).toLocaleDateString('uk-UA');

  const handleDelete = () => {};

  return (
    <div className={styles.container}>
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

      <Link
        to={link}
        className={styles.link}
      >
        link
      </Link>

      <span className={styles.startDay}>{date}</span>
    </div>
  );
};
