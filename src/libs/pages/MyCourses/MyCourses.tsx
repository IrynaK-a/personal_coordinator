import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader, MyCourseCard } from '../../components';
import * as coursesActions from '../../slices/coursesSlice';

import styles from './MyCourses.module.scss';
import { AppRoute } from '../../types';

export const MyCourses = () => {
  const dispatch = useAppDispatch();
  const { myCourses, coursesRequestStatus, hasError } = useAppSelector(
    state => state.courses,
  );

  const isLoading = coursesRequestStatus === 'pending';
  const hasNoCourses =
    (!myCourses || myCourses.length === 0) && !isLoading && !hasError;
  const hasCourses = !isLoading && !hasNoCourses && !hasError && !!myCourses;

  useEffect(() => {
    dispatch(coursesActions.getAllMyCourses());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}

      {hasCourses &&
        myCourses.map(course => (
          <MyCourseCard
            course={course}
            key={course.id}
          />
        ))}

      {hasNoCourses && (
        <div className={styles.noCoursesSection}>
          <Link
            to={AppRoute.CREATE_COURSE}
            className={styles.createCourseLink}
          >
            Create course
          </Link>
        </div>
      )}
    </div>
  );
};
