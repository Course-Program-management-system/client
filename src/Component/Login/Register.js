import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/js/dist/base-component";
import { Link } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import  '../../assets/bg/collegelogo.svg'
import logo from "../../Assets/bg/collegelogo.svg";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Univeristy Name:</label>
          <input
            type="text"
            required
            id="univeristyname"
            placeholder="Univeristy"
            onChange={(e) => setName(e.target.value)}
            value={name}
            tabIndex={1}
          />
        </div>
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
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
