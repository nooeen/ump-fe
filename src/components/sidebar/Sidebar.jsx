import React from "react";
import {
  LineStyle,
  ChatBubbleOutline,
  ForumOutlined,
  GradeOutlined,
  PersonOutline,
  NotInterested,
  NotificationsNone,
  Person,
} from "@mui/icons-material";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const history = useHistory();

  const toHome = () => {
    let path = `/dashboard`;
    history.push(path);
  };

  const toWarningStudents = () => {
    let path = "/students/warning";
    history.push(path);
  };

  const toBonusStudents = () => {
    let path = "/students/bonus";
    history.push(path);
  };

  const toStudents = () => {
    let path = `/students`;
    history.push(path);
  };

  const toManager = () => {
    let path = '/manager';
    history.push(path);
  }

  const toNotifications = () => {
    let path = '/notifications';
    history.push(path);
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">BẢNG ĐIỀU KHIỂN</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toHome}>
              <LineStyle className="sidebarIcon" />
              Trang chủ
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">CỐ VẤN</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toManager}>
              <Person className="sidebarIcon" />
              Cố vấn
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">SINH VIÊN</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toStudents}>
              <PersonOutline className="sidebarIcon" />
              Sinh viên
            </li>
            <li className="sidebarListItem" onClick={toBonusStudents}>
              <GradeOutlined className="sidebarIcon" />
              Tiêu biểu
            </li>
            <li className="sidebarListItem" onClick={toWarningStudents}>
              <NotInterested className="sidebarIcon" />
              Cảnh cáo
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">GIAO TIẾP</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NotificationsNone className="sidebarIcon" onClick={toNotifications}/>
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
