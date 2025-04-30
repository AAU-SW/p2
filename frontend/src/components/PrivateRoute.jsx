import { Route, Redirect } from 'wouter';
export const PrivateRoute = ({
  path,
  isAuthenticated,
  redirectPath,
  children,
}) => {
  return (
    <Route path={path}>
      {isAuthenticated ? children : <Redirect to={redirectPath} />}
    </Route>
  );
};
