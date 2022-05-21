import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/js/dist/base-component";
import { Link } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import  '../../assets/bg/collegelogo.svg'
import logo from "../../Assets/bg/collegelogo.svg";
import { NavLink } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post("/login", { email, password }, config);
      localStorage.setItem("token", data.message);
      history.push("/dashboard");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <img className="logo img-fluid " src={logo} alt="college UNIVERSITY" />
        <h3 className="login-screen__title mt-5">Login</h3>
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
          <label htmlFor="password">
            Password:{" "}
            <Link to="/forgotpassword" className="login-screen__forgotpassword">
              Forgot Password?
            </Link>
          </label>
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
          Login
        </button>
        <div style={{ textAlign: "center" }}>
          <NavLink to={`/create-university`} exact>
            Create University
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Login;
