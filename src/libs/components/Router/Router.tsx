import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../types';
import { App } from '../App';
import { HomePage, LandingPage, MyCourses } from '../../pages';
import { PublicRoute } from '../PublicRoute';
import { ProtectedRoute } from '../ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <App />,
    children: [
      {
        path: AppRoute.ROOT,
        element: (
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        ),
      },
      {
        path: AppRoute.HOME,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.COURSES,
        element: (
          <ProtectedRoute>
            <MyCourses />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <p> Nothing here</p>,
      },
    ],
  },
]);
