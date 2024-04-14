import { useEffect, useState } from 'react';
import avatar from '../../../assets/icons/avatar.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as aiActions from '../../slices/aiSlice';
import { Loader } from '../../components/Loader';
import { IInspirationResponse } from '../../types';

import style from './HomePage.module.scss';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { quote, aiRequestStatus, userName } = useAppSelector(
    ({ ai, auth }) => ({
      quote: ai.answer,
      userName: auth.user,
      aiRequestStatus: ai.aiRequestStatus,
    }),
  );
  const [inspiration, setInspiration] = useState<IInspirationResponse | null>(
    null,
  );

  const isInspirationLoading = aiRequestStatus === 'pending';
  const hasInspirationShown = aiRequestStatus !== 'idle';

  const getInspired = async () => {
    dispatch(aiActions.getInspired());
  };

  useEffect(() => {
    if (quote && typeof quote !== 'string') {
      setInspiration(quote);
    }
  }, [quote]);

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

      <button
        type="button"
        className={style.findCourseButton}
      >
        Find course
      </button>

      <div className={style.courses}>
        <h2 className={style.title}>Courses</h2>

        <div className={style.cards}>Cards</div>
        <div className={style.pagination}>pagination</div>
      </div>
    </div>
  );
};
