import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../slices/authSlice';
import { DataStatus } from '../../types';
import { Loader } from '../Loader';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, authRequestStatus } = useAppSelector(state => state.auth);

  const isLoading = !(
    authRequestStatus === DataStatus.FULFILLED ||
    authRequestStatus === DataStatus.REJECTED
  );

  useEffect(() => {
    if (!user) {
      dispatch(authActions.getCurrentUser());
    }
  }, [user, dispatch]);

  return isLoading ? (
    <div
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Loader />
    </div>
  ) : (
    <Outlet />
  );
};
