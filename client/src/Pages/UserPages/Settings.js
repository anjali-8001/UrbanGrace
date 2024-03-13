import React from "react";
import "../../Styles/Settings.css";
import Layout from "../../Components/Layout.js";
import AccountNavbar from "../../Components/AccountNavbar.js";

function Settings() {
  return (
    <div className="settings">
      <Layout>
        <AccountNavbar>
          <div className="settingsContainer">
            <h1 className="settingsHeading">
              <center>Account Settings</center>
            </h1>
            <div className="settingsSectionContainer">
              <div className="settingsSection">
                <h3 className="sectionHeading">My Information</h3>
                <div className="sectionContent"></div>
              </div>
              <div className="settingsSection">
                <h3 className="sectionHeading">Delivery Address</h3>
              </div>
              <div className="settingsSection">
                <h3 className="sectionHeading">Change Password</h3>
              </div>
            </div>
          </div>
        </AccountNavbar>
      </Layout>
    </div>
  );
}

export default Settings;
