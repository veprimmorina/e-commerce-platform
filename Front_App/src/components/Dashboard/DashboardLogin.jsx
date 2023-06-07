import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function DashboardLogin() {
  const [admin, setadmin] = useState("");
  const [userName, setUserName] = useState();
  const [password, setpassword] = useState();
  const [showLogin, setShowLogin] = useState(true);
  const [code, setCode] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_authorization");

    if (jwtToken) {
      navigate("/dashboard");
    } else {
    }
  });

  const login = () => {
    var AuthRequest = {
      userName: userName,
      password: password,
    };
    axios
      .post("http://127.0.0.1:9192/authenticate/admin/" + code, AuthRequest)
      .then((response) => {
        localStorage.setItem("jwt_authorization", response.data, {
          sameSite: "strict",
          expires: new Date(response.data.exp * 1000),
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Invalid Code!", toast.POSITION.TOP_RIGHT);
        console.log(error);
      });
  };

  const sendCode = () => {
    var AuthRequest = {
      userName: userName,
      password: password,
    };
    axios
      .post("http://127.0.0.1:9192/send/code", AuthRequest)
      .then((response) => {
        setShowLogin(false);
      })
      .catch((error) => {
        toast.error("Invalid credentials!", toast.POSITION.TOP_RIGHT);
        console.log(error);
      });
  };

  return (
    <>
      {localStorage.getItem("jwt_authorization") == undefined ||
      localStorage.getItem("jwt_authorization") == "" ? (
        <div>
          {showLogin && (
            <div className="login-dash">
              <div className="">
                <label htmlFor="username">Username: </label>
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="username">Password: </label>
                <input
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <Button
                variant="dark"
                className="mt-3"
                onClick={() => sendCode()}
              >
                Login
              </Button>
              <ToastContainer />
            </div>
          )}
          {!showLogin && (
            <div className="login-dash">
              <div className="">
                <label htmlFor="username">Code in email: {userName}: </label>
                <input type="text" onChange={(e) => setCode(e.target.value)} />
              </div>
              <Button variant="dark" className="mt-3" onClick={() => login()}>
                Verify
              </Button>
              <ToastContainer />

            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default DashboardLogin;
