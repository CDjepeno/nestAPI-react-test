import React, { useContext } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import AuthContext from '../context/context';

type Props = {
  path: any;
  component: any;
  exact: any;
};

export const PrivateRoute: React.FC<Props> = ({ path, component }) => {
  const { isAuthenticatedUser } = useContext(AuthContext);
  return  isAuthenticatedUser ? (
    <Route path={path} element={<Outlet />} />
  ) : (
    <Navigate to="/login" />
  );
};
