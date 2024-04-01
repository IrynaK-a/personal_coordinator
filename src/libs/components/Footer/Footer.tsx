import { Nav } from '../Nav';
import { Logo } from '../Logo';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Nav className={styles.footerNav} />

      <div className={styles.logo}>
        <Logo />
      </div>
    </footer>
  );
};
