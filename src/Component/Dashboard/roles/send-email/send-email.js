import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../../../Service/api";
import Utils from "../../../../Service/utils";
import "../../../Login/Login.css";
export default function RegisterAdmin({ param, heading }) {
  const paramsData = useParams();
  const history = useHistory();
  const [form, setForm] = useState({ email: ``, file: null });
  const [submitting, setSubmitting] = useState(false);
  function sendRegistrationLink(e) {
    // e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    Api.registerAdmin(param, paramsData[`${param}Id`], form)
      .then(({ data: { message } }) => {
        Utils.Toast.next("Email link sucessfully sent");
        history.goBack();
      })
      .catch(() => {
        setSubmitting(false);
      });
  }
  return (
    <div className="login-screen" style={{ height: "calc(100vh - 250px)" }}>
      <div className="login-screen__form">
        <h3 className="login-screen__title mt-3 mb-3">{heading}</h3>
        <div className="form-group">
          <input
            multiple={false}
            type="file"
            onChange={(e) =>
              setForm({ file: Object.values(e.target.files)[0] })
            }
            className=" form-control form-control-sm"
          />
          <p className="pt-2 text-center opacity-50 text-sm">or</p>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            tabIndex={1}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3 mb-3"
          disabled={submitting || (!form.email && !form.file)}
          onClick={sendRegistrationLink}
        >
          {(!submitting && "Register") || "Registering"}
        </button>
      </div>
    </div>
  );
}
