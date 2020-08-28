import React from "react";
import { useSelector } from "react-redux";

export default () => {
    const isAuthenticated = useSelector( state => state.isAuthenticated)
    return (
  <div>
    <h1>Hello World!!!</h1>
    <h2>Hey {isAuthenticated}</h2>
    <h3>This is the Notification Page</h3>
  </div>
);
}