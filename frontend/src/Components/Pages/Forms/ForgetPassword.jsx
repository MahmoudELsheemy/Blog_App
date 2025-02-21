import React from "react";
import "./Register.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgetPassword} from "../../../redux/apiCalls/PasswordApiCall";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return toast.error("Please enter a email");
    }

    dispatch(forgetPassword(email));
  };

  return (
    <div className="form-container-register">
      <h1 className="form-title">Forget Password</h1>
      <form onSubmit={handleSubmit} className="form-register">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="form-button-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
