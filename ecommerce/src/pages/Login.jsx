import React, { useContext, useState } from "react";
import "../AppExtra.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
const Login = () => {
  const { setUser } = useContext(UserContext);
  const [inputDetails, setInputDetails] = useState();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputDetails({ ...inputDetails, [name]: value });
  };
  const signin = () => {
    axios.post("http://16.171.35.127:3001/login", inputDetails).then((res) => {
      alert(res.data.message);
      if (res.data.u) {
        setUser(res.data.u);
        document.getElementById("remember").checked &&
          localStorage.setItem("user", JSON.stringify(res.data.u));
      }
    });
  };
  return (
    <>
      <div className="maincont">
        <div method="POST" className="signUpForm">
          <p>Log Into Your Account</p>
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
          <button className="bluebut" onClick={signin}>
            Login
          </button>
          <div className="switchformcont">
            Dont have an account?{" "}
            <Link className="switchform" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
