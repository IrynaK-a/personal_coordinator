/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';

import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as ChangeIcon } from '../../../assets/icons/change.svg';
import { AppRoute, UpdateCourseData, ICourse } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import * as coursesActions from '../../slices/coursesSlice';

import styles from './AboutCourseSection.module.scss';

type Props = {
  course: ICourse;
};

export const AboutCourseSection: React.FC<Props> = ({
  course: { description, id, image, link, name, startDate, status },
}) => {
  const dispatch = useAppDispatch();
  const [updatedCourse, setUpdatedCourse] = useState<UpdateCourseData>({
    description,
    link,
    name,
    status,
  });
  const [isChanging, setIsChanging] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [validationError, setValidationError] = useState('');

  const date = new Date(startDate).toLocaleDateString('uk-UA');

  const handleDelete = () => {
    dispatch(coursesActions.deleteCourse(id));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof UpdateCourseData,
  ) => {
    setValidationError('');

    setUpdatedCourse({
      ...updatedCourse,
      [key]: e.target.value,
    });
  };

  const handleUpdateCourse = () => {
    const hasNoCourseName = !updatedCourse.name.trim();

    if (hasNoCourseName) {
      setUpdatedCourse({
        description,
        link,
        name,
        status,
      });
      setIsChanging(false);

      return;
    }

    dispatch(coursesActions.updateCurrentCourse({ id, updatedCourse }));
  };

  const handleChangeButtonClick = () => {
    setShowDescription(true);
    setIsChanging(true);
  };

  const handleSubmitButtonClick = () => {
    setShowDescription(false);
    setIsChanging(false);

    handleUpdateCourse();
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div
          className={cn(styles.textInfo, {
            [styles.textInfoGrow]: image,
          })}
        >
          <div className={styles.courseManipulationContainer}>
            {isChanging ? (
              <>
                <input
                  type="text"
                  value={updatedCourse.name}
                  className={styles.input}
                  onChange={e => handleChange(e, 'name')}
                />
                <button
                  type="button"
                  className={styles.submitButton}
                  onClick={handleSubmitButtonClick}
                >
                  Submit
                </button>
              </>
            ) : (
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>{name}</h2>

                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={handleChangeButtonClick}
                >
                  <ChangeIcon className={styles.changeIcon} />
                </button>
              </div>
            )}
            {validationError && <p>{validationError}</p>}

            <button
              type="button"
              className={styles.iconButton}
              onClick={handleDelete}
            >
              <DeleteIcon className={styles.deleteIcon} />
            </button>
          </div>

          <div className={styles.linkContainer}>
            {isChanging ? (
              <input
                type="text"
                value={updatedCourse.link}
                className={styles.input}
                onChange={e => handleChange(e, 'link')}
              />
            ) : (
              <Link
                to={link ?? AppRoute.MY_COURSES}
                className={styles.link}
                target="_blank"
              >
                link
              </Link>
            )}
          </div>

          <span className={styles.startDay}>{date}</span>
        </div>

        {image && (
          <img
            src={image}
            alt={name}
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.descriptionButtonSection}>
        <button
          type="button"
          className={cn(styles.descriptionButton, {
            [styles.activeDescriptionButton]: showDescription,
          })}
          onClick={() => setShowDescription(!showDescription)}
        >
          Description
        </button>
      </div>

      {showDescription &&
        (isChanging ? (
          <input
            type="text"
            value={updatedCourse.description}
            className={styles.input}
            onChange={e => handleChange(e, 'description')}
            placeholder="Add description"
          />
        ) : (
          <p className={styles.description}>{description}</p>
        ))}
    </div>
  );
};
