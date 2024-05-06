import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../types';
import { App } from '../App';
import { PublicRoute } from '../PublicRoute';
import { ProtectedRoute } from '../ProtectedRoute';
import {
  CoursePage,
  CreateCoursePage,
  FindCoursePage,
  HomePage,
  LandingPage,
  MyCoursesPage,
  ProfilePage,
} from '../../pages';

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
        path: AppRoute.MY_COURSES,
        element: (
          <ProtectedRoute>
            <MyCoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.CREATE_COURSE,
        element: (
          <ProtectedRoute>
            <CreateCoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.COURSE,
        element: (
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.FIND_COURSES,
        element: (
          <ProtectedRoute>
            <FindCoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
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
