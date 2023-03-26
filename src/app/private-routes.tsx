import React from "react";
import { Outlet } from "react-router";
import Login from "../features/login/login";

export function PrivateRoutes(props: any) {

  return props.isAuthenticated ? <Outlet /> : <Login setAuth={props.setAuth} />;
}

export default PrivateRoutes;
