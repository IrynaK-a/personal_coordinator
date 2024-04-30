/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppSelector } from '../../app/hooks';
import {
  CoursesSections,
  FindCourseButton,
  FindCourseForm,
} from '../../components';
import { FindCourseMessageContainer } from '../../components/FindCourseMessageContainer/FindCourseMessageContainer';
import { DataStatus } from '../../types';

import styles from './FindCoursePage.module.scss';

export const FindCoursePage = () => {
  const { aiCoursesRequestStatus, findedCourses } = useAppSelector(
    state => state.ai,
  );

  const hasFindedCourses = Boolean(findedCourses?.length);
  const hasError =
    aiCoursesRequestStatus === DataStatus.REJECTED ||
    (aiCoursesRequestStatus === DataStatus.FULFILLED && !hasFindedCourses);
  const hasFormShown =
    aiCoursesRequestStatus !== DataStatus.FULFILLED &&
    aiCoursesRequestStatus !== DataStatus.REJECTED;

  return (
    <div className={styles.container}>
      <FindCourseMessageContainer />

      {hasFormShown && <FindCourseForm />}

      {hasFindedCourses && <CoursesSections />}

      {hasError && (
        <>
          <FindCourseButton type="link" />
          <CoursesSections showDefault />
        </>
      )}
    </div>
  );
};
