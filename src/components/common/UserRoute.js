import React from "react";
import { Route } from "react-router-dom";
import Proptype from "prop-types";

const UserRoute = ({ component: Component, auth, ...rest }) => {

    return (
        <Route
        {...rest}
        render={(props) => <Component {...props} />
        }
    />
)

}

UserRoute.prototype = {
  auth: Proptype.object.isRequired,
};


export default UserRoute;