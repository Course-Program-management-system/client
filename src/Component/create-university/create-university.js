import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/base-component";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/bg/collegelogo.svg";
import Utils from "../../Service/utils";
import "../Login/Login.css";
const CreateUniversity = ({ history }) => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [college, setCollege] = useState("");
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post("/superadmin", { email, collegeName: college })
      .then(({ data }) => {
        setEmail("");
        setCollege("");
        setSubmitting(false);
        Utils.Toast.next("Password link sent successfully");
        // localStorage.setItem("token", data.message);
        // history.push("/dashboard");
      })
      .catch(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="login-screen">
      <form onSubmit={loginHandler} className="login-screen__form">
        <img className="logo img-fluid " src={logo} alt="college UNIVERSITY" />
        <h3 className="login-screen__title mt-5">Create University</h3>
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
          <label htmlFor="password">College: </label>
          <input
            type="text"
            required
            id="college"
            autoComplete="true"
            placeholder="Enter College Name"
            onChange={(e) => setCollege(e.target.value)}
            value={college}
            tabIndex={2}
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="password">Password: </label>
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
        </div> */}
        <button disabled={submitting} type="submit" className="btn btn-primary">
          {(submitting && "Submitting...") || "Create University"}
        </button>
        <div style={{ textAlign: "center" }}>
          <NavLink to={`/login`} exact>
            Login
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default CreateUniversity;
