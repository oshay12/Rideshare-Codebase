import React, { useState } from "react";
import { Breadcrumb, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./login.css";
import { isDriver, isRider } from "../../services/AuthService";

function LogIn({ isLoggedIn, logIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setSubmitted] = useState(false);

  const onSubmit = async () => {
    if (checkPassword()) {
      try {
        const { response, isError } = await logIn(username, password);
        if (isError) {
          const data = response.response.data;
          setErrorMessage(data["detail"]);
        } else {
          await response;
          setSubmitted(true);
          if (isLoggedIn) {
            if (isRider()) {
              return <Navigate to="/rider" />;
            } else if (isDriver()) {
              return <Navigate to="/driver" />;
            }
          }
        }
      } catch (error) {
        console.error("CAUGHT ERROR: " + error);
      }
    }
  };

  if (isLoggedIn || isSubmitted) {
    if (isLoggedIn) {
      if (isRider()) {
        return <Navigate to="/rider" />;
      } else if (isDriver()) {
        return <Navigate to="/driver" />;
      }
    }
    return <Navigate to="/" />;
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const checkPassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Please enter a valid password.\nThe password must be at least 8 characters long,\nand contain at least one uppercase letter, one lowercase letter, and one number."
      );
      setPassword("");
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Log in</Breadcrumb.Item>
      </Breadcrumb>

      <div className="login">
        <div className="login__forum">
          <h1>
            <span>Sign in and get started.</span>
          </h1>
          <form onSubmit={onSubmit}>
            <input
              type="username"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />

            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            {errorMessage && <p>{errorMessage}</p>}

            <button type="submit" id="submit">
              Log in
            </button>

            <Card.Text className="text-center">
              Don't have an account? <Link to="/sign-up">Sign up!</Link>
            </Card.Text>
            <div className="login__main-square"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
