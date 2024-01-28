import React, { useEffect, useState } from "react";
import { isValidElement } from "../utils/Constants";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    let userData = localStorage.getItem("users");
    setUsers(userData);
  }, []);

  return (
    <Route
      {...rest}
      render={() => {
        return isValidElement(users) ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
