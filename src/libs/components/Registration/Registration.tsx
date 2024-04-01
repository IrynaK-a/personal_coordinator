import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { MENU_ITEMS } from '../../constants';

import { LoginForm } from '../LoginForm/LoginForm';
import { RegistrationForm } from '../RegistrationForm/RegistrationForm';

import styles from './Registration.module.scss';

type Props = {
  className?: string;
};

export const Registration: React.FC<Props> = ({ className }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <StyledEngineProvider injectFirst>
      <section
        id={MENU_ITEMS.Home}
        className={(styles.section, className)}
      >
        <h1 className={styles.title}>Personal Coordinator</h1>

        <div className={styles.buttonGroup}>
          <Button
            variant="text"
            className={isLogin ? styles.textButtonActive : styles.textButton}
            onClick={() => setIsLogin(true)}
          >
            Log in
          </Button>

          <Button
            variant="text"
            className={!isLogin ? styles.textButtonActive : styles.textButton}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </Button>
        </div>

        {isLogin ? <LoginForm /> : <RegistrationForm />}
      </section>
    </StyledEngineProvider>
  );
};
