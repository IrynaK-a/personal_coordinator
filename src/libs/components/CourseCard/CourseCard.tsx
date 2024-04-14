import { Link } from 'react-router-dom';
import { ICourses } from '../../constants/courses';
import courseImage from '../../../assets/icons/tasks.svg';

import styles from './CourseCard.module.scss';

type Props = {
  course: ICourses;
};

export const CourseCard: React.FC<Props> = ({
  course: { description, title, image = courseImage, link },
}) => {
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={title}
        className={styles.image}
      />
      <div className={styles.info}>
        <Link
          to={link}
          className={styles.link}
        >
          <h3 className={styles.title}>{title}</h3>
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
