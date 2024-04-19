import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../../assets/icons/avatar.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as aiActions from '../../slices/aiSlice';
import * as coursesActions from '../../slices/coursesSlice';
import { AppRoute, DataStatus, IInspirationResponse } from '../../types';
import { Loader, CourseCard } from '../../components';

import style from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { aiRequestStatus, answer: quote } = useAppSelector(state => state.ai);
  const { user: userName } = useAppSelector(state => state.auth);
  const { defaultCourses, defaultCoursesRequestStatus } = useAppSelector(
    state => state.courses,
  );
  const [inspiration, setInspiration] = useState<IInspirationResponse | null>(
    null,
  );

  const isInspirationLoading = aiRequestStatus === DataStatus.PENDING;
  const hasInspirationShown = aiRequestStatus !== DataStatus.IDLE;
  const isDefaultCoursesLoading =
    defaultCoursesRequestStatus === DataStatus.PENDING;

  const getInspired = async () => {
    dispatch(aiActions.getInspired());
  };

  useEffect(() => {
    if (quote && typeof quote !== 'string') {
      setInspiration(quote);
    }
  }, [quote]);

  useEffect(() => {
    if (!defaultCourses) {
      dispatch(coursesActions.getAllDefaultCourses());
    }
  }, [dispatch, defaultCourses]);

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
