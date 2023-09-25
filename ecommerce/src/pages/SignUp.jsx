import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AppExtra.css";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const n = useNavigate();
  const [inputDetails, setInputDetails] = useState();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
  };
  const register = () => {
    if (
      String(inputDetails.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) &&
      String(inputDetails.password).match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      )
    )
      axios
        .post("http://16.171.35.127:3001/signup", inputDetails)
        .then((res) => {
          if (res.data.success) {
            alert("Successfully Created");
            n("/login");
          } else alert("Invalid");
        })
        .catch((err) => {
          alert(err);
        });
    else alert("error");
  };
  useEffect(() => {
    alert("Password should have 8 Characters including a Number");
  }, []);
  return (
    <>
      <div className="maincont">
        <div className="signUpForm">
          <p>Create Account</p>
          <label className="inputlabel" htmlFor="name">
            Name
          </label>
          <input onChange={handleInput} type="text" name="name" id="name" />
          <label className="inputlabel" htmlFor="em">
            E-Mail
          </label>
          <input onChange={handleInput} type="email" name="email" id="em" />
          <label className="inputlabel" htmlFor="pw">
            Password
          </label>
          <input
            onChange={handleInput}
            type="password"
            name="password"
            id="pw"
          />
          <label className="rememberme" htmlFor="remember">
            <input
              className="check"
              type="checkbox"
              name="remember"
              id="remember"
            />
            Remember Me
          </label>
          <button className="bluebut" onClick={register}>
            Get Started
          </button>
          <div className="switchformcont">
            Already have an account?{" "}
            <Link className="switchform" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
