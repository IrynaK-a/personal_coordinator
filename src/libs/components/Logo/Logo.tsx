import { Link } from 'react-router-dom';
import cn from 'classnames';

import logo from '../../../assets/icons/Logo.png';

import styles from './Logo.module.scss';

type Props = {
  className?: string;
};

export const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link
      to="/"
      className={cn(styles.logo, className)}
    >
      <img
        className={styles.logoImage}
        src={logo}
        alt="logo"
      />
    </Link>
  );
};
