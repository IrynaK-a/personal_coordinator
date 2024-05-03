import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../../assets/img/avatar-tom.jpg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as aiActions from '../../slices/aiSlice';
import * as coursesActions from '../../slices/coursesSlice';
import { AppRoute, IInspirationResponse } from '../../types';
import { Loader, CourseCard } from '../../components';

import style from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const {
    quote,
    aiRequestStatus,
    userName,
    defaultCourses,
    defaultCoursesRequestStatus,
  } = useAppSelector(({ ai, auth, courses }) => ({
    quote: ai.answer,
    userName: auth.user,
    aiRequestStatus: ai.aiRequestStatus,
    defaultCourses: courses.defaultCourses,
    defaultCoursesRequestStatus: courses.coursesRequestStatus,
  }));
  const [inspiration, setInspiration] = useState<IInspirationResponse | null>(
    null,
  );

  const isInspirationLoading = aiRequestStatus === 'pending';
  const hasInspirationShown = aiRequestStatus !== 'idle';
  const isDefaultCoursesLoading = defaultCoursesRequestStatus === 'pending';

  const getInspired = async () => {
    dispatch(aiActions.getInspired());
  };

  useEffect(() => {
    if (quote && typeof quote !== 'string') {
      setInspiration(quote);
    }
  }, [quote]);

  useEffect(() => {
    dispatch(coursesActions.getAllDefaultCourses());
  }, [dispatch]);

  return (
    <div className={style.home}>
      <div className={style.personInfo}>
        <div className={style.leftInfo}>
          <h2 className={style.name}>{`Hi, ${userName}`}</h2>

          <p className={style.text}>Have a nice day!</p>

          <button
            type="button"
            className={style.getInspiredButton}
            onClick={getInspired}
          >
            get inspired
          </button>
        </div>

        <img
          src={avatar}
          alt="avatar"
          className={style.avatar}
        />
      </div>

      <section
        className={style.inspirationSection}
        style={{
          display: hasInspirationShown ? 'block' : 'none',
        }}
      >
        {isInspirationLoading ? (
          <Loader />
        ) : (
          <>
            <span className={style.inspirationTitle}>
              {inspiration && inspiration.title}
              {'! '}
            </span>
            <span>{inspiration && inspiration?.text}</span>
          </>
        )}
      </section>

      <Link
        to={AppRoute.FIND_COURSES_FORM}
        className={style.findCourseButton}
      >
        Find course
      </Link>

      <div className={style.courses}>
        <h2 className={style.title}>Courses</h2>

        <div className={style.cards}>
          {isDefaultCoursesLoading && <Loader />}

          {defaultCourses &&
            defaultCourses.map(course => (
              <CourseCard
                course={course}
                key={course.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
