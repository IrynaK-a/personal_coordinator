import { StyledEngineProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';

import styles from './LoginForm.module.scss';

export const LoginForm = () => {
  return (
    <StyledEngineProvider injectFirst>
      <form
        className={styles.form}
        autoComplete="off"
      >
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
        />

        <input
          type="password"
          className={styles.input}
          placeholder="Password"
        />

        <Button
          variant="contained"
          type="submit"
          className={styles.submitButton}
        >
          Log in
        </Button>
      </form>
    </StyledEngineProvider>
  );
};
