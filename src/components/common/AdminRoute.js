import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector(state => state.auth)
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated && auth.role === 0 ? <Component {...props} /> :  <Redirect to="/login" /> 
      }
    />
  )

}

export default AdminRoute;