import cn from 'classnames';
import { StyledEngineProvider } from '@mui/material/styles';

import Button from '@mui/material/Button';

import { useState } from 'react';
import styles from './RegistrationForm.module.scss';

export const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [formError, setFormError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !name.trim() &&
      !email.trim() &&
      !password.trim() &&
      !repeatedPassword.trim()
    ) {
      setFormError(true);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <form
        className={cn(styles.form, {
          [styles.error]: formError,
        })}
        onSubmit={e => handleSubmit(e)}
      >
        <input
          type="text"
          className={styles.input}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          className={styles.input}
          placeholder="Repeat password"
          onChange={e => setRepeatedPassword(e.target.value)}
        />

        <Button
          variant="contained"
          type="submit"
          className={styles.submitButton}
        >
          Sign up
        </Button>
      </form>
    </StyledEngineProvider>
  );
};
