import React, { useEffect } from "react";
import { isValidElement } from "../utils/Constants";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let users = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={() => {
        return isValidElement(users?.id) ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
