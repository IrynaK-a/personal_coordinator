import cn from 'classnames';

import { NavLink, Outlet } from 'react-router-dom';
import { ACCOUNT_MENU_ITEMS } from '../../constants';
import { LogoIcon, LogoText } from '../../components';
import { ReactComponent as LogOut } from '../../../assets/icons/log-out.svg';

import styles from './AccountLayout.module.scss';

const logOutLabel = 'Log out';

export const AccountLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <LogoIcon
            className={styles.logoIcon}
            linkTo={ACCOUNT_MENU_ITEMS.Home.path}
          />
          <LogoText
            linkTo={ACCOUNT_MENU_ITEMS.Home.path}
            className={styles.logoText}
          />

          <nav className={styles.nav}>
            <ul className={styles.list}>
              {Object.values(ACCOUNT_MENU_ITEMS).map(item => {
                const SvgIcon = item.icon;

                return (
                  <li
                    key={item.path}
                    className={styles.item}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn(styles.link, { [styles.activeLink]: isActive })
                      }
                    >
                      <SvgIcon className={styles.linkImg} />

                      <span className={styles.linkLabel}>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <NavLink
            to="/"
            className={styles.link}
          >
            <LogOut className={styles.linkImg} />

            <span className={styles.linkLabel}>{logOutLabel}</span>
          </NavLink>
        </header>

        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
