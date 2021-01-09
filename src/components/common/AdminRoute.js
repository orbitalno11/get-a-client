import React from "react";
import { Route } from "react-router-dom";
import Proptype from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => {

    return (
        <Route
        {...rest}
        render={(props) => <Component {...props} />
        }
    />
)

}

AdminRoute.prototype = {
  auth: Proptype.object.isRequired,
};


export default AdminRoute;