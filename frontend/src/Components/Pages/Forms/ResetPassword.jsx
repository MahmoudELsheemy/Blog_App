import React, { useEffect } from "react";
import "./Register.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  changePassword,
} from "../../../redux/apiCalls/PasswordApiCall";
import { useParams } from "react-router-dom";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const { isErorr } = useSelector((state) => state.password);

  const [password, setPassword] = useState("");

useEffect(() => {
  dispatch(resetPassword(id, token));
}, [id, token, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.trim() === "") {
      return toast.error("Please enter a password");
    }

    dispatch(changePassword(password, { id, token }));
  };

  return (
    <div className="form-container-register">
      {isErorr ? (
        <h1>Not found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password </h1>
          <form onSubmit={handleSubmit} className="form-register">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter New your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-button-submit" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
