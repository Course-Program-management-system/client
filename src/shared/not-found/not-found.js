import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "calc(3vw + 20px)",
      }}>
      <div>Oops! Page Not Found</div>
      <Link to="/">Home</Link>
    </div>
  );
}
