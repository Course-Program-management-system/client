import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Utils from "../../Service/utils";
import "../Login/Login.css";
export default function ChangePassword() {
  const history = useHistory();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  function verifyPassword(e) {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post("/changepassword", { email })
      .then(() => {
        Utils.Toast.next("Change password link send successfully");
        history.push("/login");
      })
      .catch(() => {
        setSubmitting(false);
      });
  }
  return (
    <div className="login-screen">
      <form onSubmit={verifyPassword} className="login-screen__form">
        <h3 className="login-screen__title mt-3 mb-3">Change password</h3>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary mt-3 mb-3">
          {(submitting && "Submitting") || "Submit"}
        </button>
      </form>
    </div>
  );
}
