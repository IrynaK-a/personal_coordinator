import { Link, useNavigate } from 'react-router-dom';
import courseImage from '../../../assets/icons/tasks.svg';

import { AppRoute, IDefaultCourse } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';

import styles from './CourseCard.module.scss';

type Props = {
  course: IDefaultCourse;
};

export const CourseCard: React.FC<Props> = ({
  course: { description, name, image = courseImage, link },
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(state => state.auth);
  const handleAddToMyCourses = async () => {
    await dispatch(
      coursesActions.create({
        link,
        name,
        description,
        image,
      }),
    );

    if (user) {
      navigate(AppRoute.MY_COURSES);
    }
  };

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
          target="_blank"
        >
          <h3 className={styles.title}>{name}</h3>
        </Link>

        <p className={styles.description}>{description}</p>
      </div>

      <button
        type="button"
        className={styles.button}
        onClick={handleAddToMyCourses}
      >
        +
      </button>
    </div>
  );
};
