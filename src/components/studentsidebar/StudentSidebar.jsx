import React from "react";
import {
  ChatBubbleOutline,
  // ForumOutlined,
  PersonOutline,
  Person,
  NotificationsNone,
} from "@mui/icons-material";
import "./StudentSidebar.css";
import { useHistory } from "react-router-dom";

export default function StudentSidebar() {
  const history = useHistory();

  const toStudentHome = () => {
    const path = `/dashboard`;
    history.push(path);
  };

  const toManager = () => {
    const path = `/manager`;
    history.push(path);
  };

  const toNotifications = () => {
    const path = "/notifications";
    history.push(path);
  };

  const toChat = () => {
    const path = "/chat";
    history.push(path); 
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">HỒ SƠ</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toStudentHome}>
              <PersonOutline className="sidebarIcon" />
              Sinh viên
            </li>
            <li className="sidebarListItem" onClick={toManager}>
              <Person className="sidebarIcon" />
              Cố vấn
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">GIAO TIẾP</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toNotifications}>
              <NotificationsNone className="sidebarIcon" />
              Thông báo
            </li>
            <li className="sidebarListItem" onClick={toChat}>
              <ChatBubbleOutline className="sidebarIcon" />
              Chat
            </li>
            {/* <li className="sidebarListItem">
              <ForumOutlined className="sidebarIcon" />
              Diễn đàn
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
