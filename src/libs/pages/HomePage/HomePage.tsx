import { useEffect, useState } from 'react';

import avatar from '../../../assets/icons/avatar.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as aiActions from '../../slices/aiSlice';
import { DataStatus, IInspirationResponse } from '../../types';
import { Loader, CoursesSections, FindCourseButton } from '../../components';

import style from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { inspirationQuote, aiInspirationRequestStatus } = useAppSelector(
    state => state.ai,
  );
  const { user } = useAppSelector(state => state.auth);
  const [inspiration, setInspiration] = useState<IInspirationResponse | null>(
    null,
  );

  const isInspirationLoading =
    aiInspirationRequestStatus === DataStatus.PENDING;
  const hasInspirationShown = aiInspirationRequestStatus !== DataStatus.IDLE;

  const getInspired = async () => {
    dispatch(aiActions.getInspired());
  };

  useEffect(() => {
    if (inspirationQuote && typeof inspirationQuote !== 'string') {
      setInspiration(inspirationQuote);
    }
  }, [inspirationQuote]);

  return (
    <div className={style.home}>
      <div className={style.personInfo}>
        <div className={style.leftInfo}>
          <h2 className={style.name}>{`Hi, ${user}`}</h2>

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

      <FindCourseButton type="link" />

      <CoursesSections showDefault />
    </div>
  );
};
