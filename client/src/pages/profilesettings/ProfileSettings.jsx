import React, { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getUser } from "../../services/AuthService";
import "./profilesettings.css";

function ProfileSettings() {
  const user = getUser();
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/#/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Profile settings</Breadcrumb.Item>
      </Breadcrumb>
      <div className="profile-square">
        <div className="profile-info">
          <h1><strong>Hello, {user.first_name}</strong> 
          <img alt=""
           src="server/media/photos/blank_pfp.webp" 
          style={{width: "4rem", height: "4rem", borderRadius: "150%", 
          border: "1px solid black", margin: "1rem"}}/>
          </h1>
          <h4><span>Profile Information</span></h4>
          <label>Username: <text>{user.username}</text></label>
          <label>First name: <text>{user.first_name}</text></label>
          <label>Last name: <text>{user.last_name}</text></label>
          <label>Profile type: <text>{user.group}</text></label>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
