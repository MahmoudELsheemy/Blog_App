import React, { useEffect } from "react";
import "./vertifyEmail.css";
import { Link } from "react-router-dom";
import {  useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vertifyEmail } from "../../../redux/apiCalls/AuthApiCall";

const VertifyEmail = () => {
  const dispatch = useDispatch()
  const { isEmailVertified} = useSelector((state) => state.auth);

  const {id ,token } = useParams();


  useEffect(() => {
    dispatch(vertifyEmail(id, token));
  }, [dispatch,id, token]);
  return (
    <div className="VertifyEmail">
      { isEmailVertified ? (
        <>
          <div className="VertifyEmail-container">
            <i className="bi bi-patch-check-fill VertifyEmail-icon"></i>
            <h1 className="VertifyEmail-title">Email Verified</h1>
            <p className="VertifyEmail-text">
              Your email has been verified. You can now log in.
            </p>
            <Link to="/login" className="VertifyEmail-link">
              Go to Log In
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="VertifyEmail-container">
            <h1 className="notVertifyEmail-title">Email Not Verified</h1>
            <p className="VertifyEmail-text">
              Please check your email for a verification link.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VertifyEmail;
