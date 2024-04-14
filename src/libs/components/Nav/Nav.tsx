import cn from 'classnames';

import { NavHashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import { LANDING_MENU_ITEMS } from '../../constants';

import styles from './Nav.module.scss';

type Props = {
  className?: string;
};

export const Nav: React.FC<Props> = ({ className }) => {
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <ul className={cn(styles.list, className)}>
        {Object.values(LANDING_MENU_ITEMS).map(item => (
          <li
            key={item}
            className={styles.item}
          >
            <NavHashLink
              smooth
              to={`/#${item}`}
              className={cn(styles.link, {
                [styles.linkSelected]: location.hash.includes(item),
              })}
            >
              {item.toUpperCase()}
            </NavHashLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
