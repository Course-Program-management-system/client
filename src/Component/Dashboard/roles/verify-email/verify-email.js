import { useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../../../../Service/api";
import "../../../Login/Login.css";
import Utils from "../../../../Service/utils";
export default function VerifyAdmin() {
  const location = useLocation();
  const history = useHistory();
  const authData = useMemo(() => location.search.split("?verify=")?.[1], []);
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [_password, _setPassword] = useState("");
  const isChangePassword = location.pathname === "/changepassword";
  function verifyPassword(e) {
    const url = !isChangePassword
      ? location.pathname
      : "/changepassword?verify=true";
    e.preventDefault();
    setSubmitting(true);
    Api.verifyAdmin(url, authData, password)
      .then(() => {
        Utils.Toast.next(
          (isChangePassword && "Password change successfully") || "User created"
        );
        history.push("/login");
      })
      .catch(() => {
        setSubmitting(false);
      });
  }
  return (
    <div className="login-screen">
      <form onSubmit={verifyPassword} className="login-screen__form">
        <h3 className="login-screen__title mt-3 mb-3">
          {(isChangePassword && "Update Password") || "Verify Registration"}
        </h3>
        <div className="form-group">
          <label htmlFor="email">Password:</label>
          <input
            type="password"
            required
            id="email"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password: </label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Confirm password"
            onChange={(e) => _setPassword(e.target.value)}
            value={_password}
            tabIndex={2}
          />
        </div>
        <button
          type="submit"
          disabled={
            _password != password || password.trim().length === 0 || submitting
          }
          className="btn btn-primary mt-3 mb-3">
          {(submitting && "Registering...") || "Register"}
        </button>
      </form>
    </div>
  );
}
