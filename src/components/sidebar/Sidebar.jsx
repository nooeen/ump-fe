import React from "react";
import {
  LineStyle,
  Timeline,
  ChatBubbleOutline,
  ForumOutlined,
  GradeOutlined,
  PersonOutline
} from "@mui/icons-material";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <PersonOutline className="sidebarIcon" />
              Students
            </li>
            <li className="sidebarListItem">
              <GradeOutlined className="sidebarIcon" />
              Grades
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Chat
            </li>
            <li className="sidebarListItem">
              <ForumOutlined className="sidebarIcon" />
              Forum
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
