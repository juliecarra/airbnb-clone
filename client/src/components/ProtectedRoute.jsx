import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthRoute = ({
  component: Component,
  isAuthenticated,

  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AuthRoute);
