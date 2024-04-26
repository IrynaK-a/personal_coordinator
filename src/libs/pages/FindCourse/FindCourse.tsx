/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import LoadingButton from '@mui/lab/LoadingButton';
import { StyledEngineProvider } from '@mui/material/styles';
import { ReactComponent as ScaleIcon } from '../../../assets/icons/upscale-spark.svg';
import {
  FIND_COURSES_FORM_DATA,
  FIND_COURSES_DEFAULT_MESSSAGE,
} from '../../constants';

import styles from './FindCourse.module.scss';

export const FindCourse = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.container}>
        <div className={styles.messageContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              {FIND_COURSES_DEFAULT_MESSSAGE.title}
            </h2>

            <ScaleIcon className={styles.icon} />
          </div>

          <div className={styles.message}>
            {FIND_COURSES_DEFAULT_MESSSAGE.text}
          </div>
        </div>

        <form className={styles.form}>
          {FIND_COURSES_FORM_DATA.map(({ label, placeholder }) => (
            <label
              className={styles.label}
              key={label}
            >
              {label}

              <textarea
                placeholder={placeholder}
                className={styles.textarea}
              />
            </label>
          ))}

          <LoadingButton
            variant="contained"
            type="submit"
            className={styles.submitButton}
          >
            <span>Find course</span>
          </LoadingButton>
        </form>
      </div>
    </StyledEngineProvider>
  );
};
