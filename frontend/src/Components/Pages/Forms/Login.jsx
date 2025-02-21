import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { login } from "../../../redux/apiCalls/AuthApiCall";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return toast.error("Please enter a email");
    }
    if (password.trim() === "") {
      return toast.error("Please enter a password");
    }
    dispatch(login({ email, password }));
  };

  return (
    <div className="form-container-register">
      <h1 className="form-title">Login</h1>
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
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="form-button-submit" type="submit">
          Login Now
        </button>
      </form>
      <div className="form-fotter">
        <p className="forgot-password">
          Did you forget your password?{" "}
          <Link to="/forgot-password">Forgot Password</Link>
        </p>

        <p className="dont-have-account">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
