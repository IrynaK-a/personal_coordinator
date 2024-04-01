import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import {
  AboutSection,
  ContactsSection,
  Footer,
  Header,
  Registration,
} from '../../components';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.hash]);

  return (
    <>
      <Header className={styles.header} />

      <div className={styles.mainContainer}>
        <main className={styles.mainContent}>
          <Registration className={styles.registrationSection} />

          <AboutSection className={styles.aboutSection} />

          <ContactsSection />
        </main>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};
