import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../Service/api";
import Utils from "../../Service/utils";

export default function Profile() {
  const history = useHistory();
  const [form, setForm] = useState({ name: "", email: "", loading: true });
  useEffect(() => {
    (async function () {
      try {
        const { email, name } = (await Api.getProfile())?.data?.message || {};
        setForm({ email, name, loading: false });
      } catch (e) {
        setForm({ loading: false });
      }
    })();
  }, []);
  const setData = (key) => {
    return ({ target }) => {
      setForm({ ...form, [key]: target.value });
    };
  };

  function onSubmit() {
    axios
      .put(`profile`, { name: form.name, email: form.email })
      .then(({ data: { message } }) => {
        Utils.Toast.next("Profile updated successfully");
        history.push("/");
      })
      .catch(() => {
        setForm({ loading: false });
      });
  }
  return (
    <div className="login-screen2">
      <div className="login-screen__form m-auto mt-5">
        <h3 className="login-screen__title mt-3 mb-3">Profile</h3>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            placeholder="Email"
            onChange={setData("email")}
            value={form.email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Name: </label>
          <input
            type="text"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter Name"
            onChange={setData("name")}
            value={form.name}
            tabIndex={2}
          />
        </div>
        <button
          type="submit"
          disabled={form.loading}
          onClick={onSubmit}
          className="btn btn-primary mt-3 mb-3"
        >
          {(form.loading && "Please Wait...") || "Submit"}
        </button>
      </div>
    </div>
  );
}
