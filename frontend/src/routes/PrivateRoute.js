import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(
    (state) => !_.isEmpty(state.auth.value.refreshToken)
  );

  /* 테스트용
  console.log('Private', isLoggedIn);
  console.log('Private', { component: Component, ...rest });
  console.log('Private-useL', useLocation());
  */

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
