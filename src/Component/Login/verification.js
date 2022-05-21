import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/js/dist/base-component";
import { Link } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import  '../../assets/bg/collegelogo.svg'
import logo from "../../Assets/bg/collegelogo.svg";

const Verification = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="login-screen">
      <form className="login-screen__form">
        <img
          className="logo img-fluid p-3 "
          src={logo}
          alt="college UNIVERSITY"
        />
        <h3 className="login-screen__title mt-3">Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirm-password"
            autoComplete="true"
            placeholder="Re-Enter password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            tabIndex={2}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Verification;
