import React from "react";
import { isRider, isDriver, getUser } from '../../services/AuthService'
import "./landing.css";

function Landing(props) {
  const user = getUser()
  return (
    <div className="middle-center">
      <div className="landing__main-square">
      {props.isLoggedIn ? (
          <>
          <h2>Welcome, {user.first_name}</h2>
          <h1 className="landing logo">Antigonish Rideshare</h1>
          </>
        ) : (
          <>
          <h2>Welcome!</h2>
          <h1 className="landing logo">Antigonish Rideshare</h1>
          <div className="signin-buttons">
            <a className="signup" href="#/sign-up">
              {" "}
              Sign up{" "}
            </a>
            <a className="login" href="#/log-in">
              {" "}
              Log in{" "}
            </a>
          </div>
          </>
        )}
        {isRider() && (
            <div className="rider__home">
              <div className="rider__buttons">
                <a href="#/rider/rider-dashboard">Ride Dashboard</a>
                <a href="#/rider/request">Request a ride!</a>
              </div>
            </div>
        )}

        {isDriver() && (
            <div className="driver__home">
              <div className="driver__buttons">
                <a href="#/driver/driver-dashboard">Driver Dashboard</a>
                {/* <a href="#/driver/drive-posting">Post a ride!</a> */}
              </div>
            </div>
        )}
        
      </div>
    </div> 
  );
}

export default Landing;
