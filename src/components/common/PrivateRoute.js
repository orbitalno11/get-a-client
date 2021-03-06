import React from "react";
import { Redirect, Route } from "react-router-dom";
import Proptype from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        <Component {...props} />
      }
    />
  )

}

PrivateRoute.prototype = {
  auth: Proptype.object.isRequired,
};


export default PrivateRoute;