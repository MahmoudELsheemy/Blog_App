import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/apiCalls/AuthApiCall";
import Swal from "sweetalert2";
const Register = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { registerMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("Please enter a username");
    }
    if (email.trim() === "") {
      return toast.error("Please enter a email");
    }
    if (password.trim() === "") {
      return toast.error("Please enter a password");
    }
    console.log(name, email, password);
    dispatch(register({ name, email, password }));
  };

  const navigate = useNavigate();

  if (registerMessage) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: registerMessage,
    }).then((isOK) => {
      if (isOK) {
        navigate("/login");
      }
    });
  }

  return (
    <div className="form-container-register">
      <h1 className="form-title">Register</h1>
      <form onSubmit={handleFormSubmit} className="form-register">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <button
          onClick={handleFormSubmit}
          className="form-button-submit"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="form-fotter">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
