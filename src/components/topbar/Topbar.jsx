import React from "react";
import "./Topbar.css";
import { useHistory } from "react-router-dom";
import { NotificationsNone, ExitToApp } from "@mui/icons-material";

export default function Topbar() {
  const history = useHistory();

  const toHome = () => {
    const path = "/dashboard";
    history.push(path);
  };

  const toLogOut = () => {
    const path = "/logout";
    history.push(path);
  };

  const toNotifications = () => {
    const path = "/notifications";
    history.push(path);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo" onClick={toHome}>
            UET Management Platform
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer" onClick={toLogOut}>
            <ExitToApp />
          </div>
          <div className="topbarIconContainer" onClick={toNotifications}>
            <NotificationsNone />
          </div>
        </div>
      </div>
    </div>
  );
}
