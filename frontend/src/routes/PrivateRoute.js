import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location.pathname }
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
