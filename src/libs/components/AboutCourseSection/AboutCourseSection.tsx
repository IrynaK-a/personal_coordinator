/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { useState } from 'react';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as ChangeIcon } from '../../../assets/icons/change.svg';
import { ICourse, UserValidationRule } from '../../types';
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
  const [isTitleChanging, setIsTitleChanging] = useState(false);
  const [courseTitle, setCourseTitle] = useState(name);
  const [isLinkChanging, setIsLinkChanging] = useState(false);
  const [courseLink, setCourseLink] = useState(link);
  const [isDescriptionChanging, setIsDescriptionChanging] = useState(false);
  const [courseDescription, setCourseDescription] = useState(description);

  const [showDescription, setShowDescription] = useState(false);
  const [validationError, setValidationError] = useState('');

  const date = new Date(startDate).toLocaleDateString('uk-UA');

  const handleDelete = () => {
    dispatch(coursesActions.deleteCourse(id));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('');
    setCourseTitle(e.target.value);
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('');
    setCourseLink(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError('');
    setCourseDescription(e.target.value);
  };

  const handleTitleSubmit = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    const value = e.target.value.trim();

    if (value === name) {
      setIsTitleChanging(false);
      return;
    }

    setCourseTitle(value);

    if (
      value.length < UserValidationRule.COURSE_NAME_MIN_LENGTH ||
      value.length > UserValidationRule.COURSE_NAME_MAX_LENGTH
    ) {
      setValidationError('Course name should be 2-60 characters');
    } else {
      setValidationError('');
      setIsTitleChanging(false);
      dispatch(
        coursesActions.changeCurrentCourse({
          id,
          changedData: {
            name: courseTitle,
            description,
            status,
            link,
          },
        }),
      );
    }
  };

  const handleDescriptionSubmit = (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    const value = e.target.value.trim();

    if (value === description) {
      setIsDescriptionChanging(false);
      return;
    }

    setCourseDescription(value);

    if (value.length > UserValidationRule.COURSE_DESCRIPTION_MAX_LENGTH) {
      setValidationError('Course name should less than 200 characters');
    } else {
      setValidationError('');
      setIsDescriptionChanging(false);
      dispatch(
        coursesActions.changeCurrentCourse({
          id,
          changedData: {
            name,
            description: courseDescription,
            status,
            link,
          },
        }),
      );
    }
  };

  const handleLinkSubmit = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const value = e.target.value.trim();

    if (value === link) {
      setIsLinkChanging(false);
      return;
    }

    setCourseLink(value);

    setValidationError('');
    setIsLinkChanging(false);
    dispatch(
      coursesActions.changeCurrentCourse({
        id,
        changedData: {
          name,
          description,
          status,
          link: courseLink,
        },
      }),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainInfo}>
        <div
          className={cn(styles.textInfo, {
            [styles.textInfoGrow]: image,
          })}
        >
          <div className={styles.titleContainer}>
            {isTitleChanging ? (
              <input
                type="text"
                value={courseTitle}
                className={styles.titleInput}
                onBlur={e => handleTitleSubmit(e)}
                onChange={e => handleTitleChange(e)}
              />
            ) : (
              <h2
                className={styles.title}
                onDoubleClick={() => setIsTitleChanging(true)}
              >
                {name}
              </h2>
            )}
            {validationError && <p>{validationError}</p>}

            <button
              type="button"
              className={styles.deleteButton}
              onClick={handleDelete}
            >
              <DeleteIcon className={styles.deleteIcon} />
            </button>
          </div>

          <div className={styles.linkContainer}>
            {isLinkChanging ? (
              <input
                type="text"
                value={courseLink}
                className={styles.titleInput}
                onBlur={e => handleLinkSubmit(e)}
                onChange={e => handleLinkChange(e)}
              />
            ) : (
              <>
                <Link
                  to={link ?? '/my-courses'}
                  className={styles.link}
                >
                  link
                </Link>

                <ChangeIcon
                  className={styles.linkChangeButton}
                  onClick={() => setIsLinkChanging(true)}
                />
              </>
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

      <button
        type="button"
        className={cn(styles.descriptionButton, {
          [styles.activeDescriptionButton]: showDescription,
        })}
        onClick={() => setShowDescription(!showDescription)}
      >
        Description
      </button>

      {showDescription &&
        (isDescriptionChanging ? (
          <input
            type="text"
            value={courseDescription}
            className={styles.titleInput}
            onBlur={e => handleDescriptionSubmit(e)}
            onChange={e => handleDescriptionChange(e)}
          />
        ) : (
          <p
            className={styles.description}
            onDoubleClick={() => setIsDescriptionChanging(true)}
          >
            {description}
          </p>
        ))}
    </div>
  );
};
