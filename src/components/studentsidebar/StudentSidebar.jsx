import React from "react";
import {
  ChatBubbleOutline,
  ForumOutlined,
  PersonOutline,
  NotificationsNone,
} from "@mui/icons-material";
import "./StudentSidebar.css";
import { useHistory } from "react-router-dom";

export default function StudentSidebar() {
  const history = useHistory();

  const toStudentHome = () => {
    let path = `/dashboard`;
    history.push(path);
  };

  const toNotifications = () => {
    let path = "/notifications";
    history.push(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">HỒ SƠ SINH VIÊN</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toStudentHome}>
              <PersonOutline className="sidebarIcon" />
              Hồ sơ
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
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Chat
            </li>
            <li className="sidebarListItem">
              <ForumOutlined className="sidebarIcon" />
              Diễn đàn
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
