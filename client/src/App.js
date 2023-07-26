import "https://code.jquery.com/jquery-3.6.0.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js";
import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  DriverDashboard,
  DriverDetail,
  Landing,
  Login,
  SignUp,
  RiderDashboard,
  RiderDetail,
  RideRequest,
  ContactUs,
  ProfileSettings,
} from "./pages";
import { Driver, Rider } from "./component";
import { isRider, isDriver, getUser } from "./services/AuthService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/lumen/bootstrap.min.css";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    // react hook to check authentication for user, to see if user is logged in and granted auth or not
    return window.localStorage.getItem("login.auth") !== null;
  });

  const logIn = async (username, password) => {
    // function to process login, grant user auth using 'login.auth' item
    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`;
    try {
      // check to see if information is correct, if correct, login is successful and user is granted auth, setLoggedIn = true
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem("login.auth", JSON.stringify(response.data));
      setLoggedIn(true);
      return { response, isError: false };
    } catch (error) {
      // if information provided is incorrect and no account is found, catch and throw error, auth not granted
      console.error(error);
      return { response: error, isError: true };
    }
  };

  const logOut = () => {
    // function to remove auth when logged out, setLoggedIn = false
    window.localStorage.removeItem("login.auth");
    setLoggedIn(false);
  };
  
  return (
    // routing between pages, all handled with react-router-dom, layout of page depends on layout object which is managed through react hooks
    <Routes>
      <Route
        path="/"
        element={<Layout isLoggedIn={isLoggedIn} logOut={logOut} />}
      >
        <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route path="sign-up" element={<SignUp isLoggedIn={isLoggedIn} />} />
        <Route
          path="log-in"
          element={<Login isLoggedIn={isLoggedIn} logIn={logIn} />}
        />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="profile-settings" element={<ProfileSettings />} />
        <Route path="rider" element={<Rider />}>
          <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
          <Route path="rider-dashboard" element={<RiderDashboard />} />
          <Route path="request" element={<RideRequest />} />
          <Route path=":id" element={<RiderDetail />} />
        </Route>
        <Route path="driver" element={<Driver />}>
          <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
          <Route path="driver-dashboard" element={<DriverDashboard />} />
          <Route path="ride-posting" element={<RiderDashboard />} />
          <Route path=":id" element={<DriverDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

function Layout({ isLoggedIn, logOut }) {
  const user = getUser()
  // handles page layout based on login status
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Container>
          <LinkContainer to="/">
            <a className="navbar-brand" href="#/">
              Antigonish Rideshare
            </a>
          </LinkContainer>

          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link active" href="#/">
                Home
                <span class="visually-hidden">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/contact-us">
                Contact us!
              </a>
            </li>
          </ul>

          {isRider() && <Nav className="me-auto"></Nav>}
          {isDriver() && <Nav className="me-auto"></Nav>}
          {isLoggedIn && (
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.username}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#/profile-settings">
                  Profile Settings
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#/" onClick={() => logOut()}>
                  <strong>Log Out</strong>
                </a>
              </div>
            </div>
          )}
        </Container>
      </nav>
      <Container className="pt-3">
        <Outlet />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
