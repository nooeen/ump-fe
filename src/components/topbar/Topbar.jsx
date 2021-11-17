import React from "react";
import "./Topbar.css";
import { NotificationsNone, Settings } from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">UET Management Platform</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
          </div>
        </div>
      </div>
    </div>
  );
}
