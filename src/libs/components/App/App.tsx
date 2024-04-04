import { Route, Routes } from 'react-router-dom';

import { MainPage, HomePage, AccountLayout } from '../../pages';

export const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<MainPage />}
        />
        <Route
          path="/"
          element={<AccountLayout />}
        >
          <Route
            path="home"
            element={<HomePage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
