import { Link } from 'react-router-dom';
import courseImage from '../../../assets/icons/tasks.svg';

import styles from './CourseCard.module.scss';
import { DefaultCourse } from '../../types';

type Props = {
  course: DefaultCourse;
};

export const CourseCard: React.FC<Props> = ({
  course: { description, name, image = courseImage, link },
}) => {
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.image}
      />
      <div className={styles.info}>
        <Link
          to={link}
          className={styles.link}
        >
          <h3 className={styles.title}>{name}</h3>
        </Link>
        <p className={styles.description}>{description}</p>
      </div>

      <button
        type="button"
        className={styles.button}
      >
        +
      </button>
    </div>
  );
};
