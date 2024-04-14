import cn from 'classnames';

import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { ACCOUNT_MENU_ITEMS } from '../../constants';
import { LogoIcon, LogoText } from '../../components';
import { ReactComponent as LogOut } from '../../../assets/icons/log-out.svg';
import { AppRoute } from '../../types';
import * as authActions from '../../slices/authSlice';

import styles from './AccountLayout.module.scss';

const logOutLabel = 'Log out';

type Props = {
  children: React.ReactElement;
};

export const AccountLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    navigate(AppRoute.ROOT);

    dispatch(authActions.actions.logOut());
  };

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
            to={AppRoute.ROOT}
            className={styles.link}
            onClick={handleLogout}
          >
            <LogOut className={styles.linkImg} />

            <span className={styles.linkLabel}>{logOutLabel}</span>
          </NavLink>
        </header>

        <div className={styles.contentContainer}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};
