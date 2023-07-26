import "./signup.css";
import React, { useState } from "react";
import axios from "axios";
import { Breadcrumb, Card } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import Select from "react-select";

function SignUp(props) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [group, setGroup] = useState("rider");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const options = [
    { value: "rider", label: "Rider" },
    { value: "driver", label: "Driver" },
  ];

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleGroupChange = (event) => {
    setGroup(event["value"]);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onSubmit = async (actions) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/sign_up/`;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("password1", password);
    formData.append("password2", confirmPassword);
    formData.append("photo", photo);
    formData.append("group", group);

    const nameRegex = /^[a-z ,.'-]+$/i;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Please enter a valid password. The password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      setPassword("");
    } else if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setEmail("");
    } else if (!nameRegex.test(firstName)) {
      setErrorMessage("Invalid characters provided for first name");
      setFirstName("");
    } else if (!nameRegex.test(lastName)) {
      setErrorMessage("Invalid characters provided for last name");
      setLastName("");
    } else if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match! Try again.");
      setConfirmPassword("");
    }

    try {
      await axios.post(url, formData);
      setSubmitted(true);
      return <Navigate to="/log-in" />;
    } catch (error) {
      setErrorMessage(error.response.data["username"]);
      return { response: error, isError: true };
    }
  };

  if (isSubmitted) {
    return <Navigate to="/log-in" />;
  }

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Sign up</Breadcrumb.Item>
      </Breadcrumb>
      <div className="signup">
        <div className="signup__forum">
          <form onSubmit={onSubmit}>
            <h1>
              <span>Sign up now!</span>
            </h1>
            <label>
              <strong>Username:</strong>
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />

            <label>
              <strong>First Name:</strong>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />

            <label>
              <strong>Last Name:</strong>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />

            <label>
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />

            <label>
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

            <label>
              <strong>Confirm Password:</strong>
            </label>
            <input
              type="password"
              id="password2"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />

            <label>
              <strong>Group:</strong>
            </label>
            <div className="select">
              <Select
                id="group"
                defaultValue={options[0]}
                onChange={handleGroupChange}
                classNamePrefix="react-select"
                className="group"
                options={options}
                required
              />
            </div>

            <div className="photo">
              <input type="file" id="photo" onChange={handlePhotoChange} />
            </div>
            {errorMessage && <p>{errorMessage}</p>}

            <button type="submit" id="submit">
              Sign up!
            </button>

            <Card.Text className="text-center">
              Already have an account? <Link to="/log-in">Log in!</Link>
            </Card.Text>
            <div className="signup__main-square"></div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
