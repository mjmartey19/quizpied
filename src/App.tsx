import { useEffect, useState } from 'react';
import { Outlet, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Dashboard from './pages/Dashboard/Dashboard';

import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import UserForm from './pages/User/UserForm';
import Users from './pages/User/Users';
import Category from './pages/Category';
import Title from './pages/Titles';
import QuizzesArea from './components/QuizzesArea';
import { ContextProvider } from './ContextApi';

function Layout() {
  const user = {token: 'fghjb543'}; // You might want to fetch or define your user data here
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
}

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<DefaultLayout />}>
          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="Trivio Quiz Dashboard" />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile" />
                <Profile />
              </>
            }
          />
          <Route
            path="/add_user"
            element={
              <>
                <PageTitle title="Add User" />
                <UserForm />
              </>
            }
          />
           <Route
            path="/view_users"
            element={
              <>
                <PageTitle title="Users" />
                <Users />
              </>
            }
          />

          <Route
            path="/quiz_categories"
            element={
              <>
                <PageTitle title="Quiz Categories" />
                <Category />
              </>
            }
          />
            <Route
            path="/quiz_titles"
            element={
              <>
                <PageTitle title="Quiz Title" />
                <Title />
              </>
            }
          />
          <Route
            path="/quizzes"
            element={
              <>
                <PageTitle title="Quiz" />
                <ContextProvider>
                  <QuizzesArea />
                </ContextProvider>
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings" />
                <Settings />
              </>
            }
          />


        </Route>
      </Route>

      <Route
        path="/"
        element={
          <>
            <PageTitle title="Signin" />
            <SignIn />
          </>
        }
      />
    </Routes>
  );
}

export default App;
