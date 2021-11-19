import React from "react";
import {
  LineStyle,
  ChatBubbleOutline,
  ForumOutlined,
  GradeOutlined,
  PersonOutline,
  NotInterested
} from "@mui/icons-material";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

export default function Sidebar() {
  const history = useHistory();

  const toHome = () => {
    let path = `/dashboard`;
    history.push(path);
  };

  const toStudents = () => {
    let path = `/student`;
    history.push(path);
  };

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
          <h3 className="sidebarTitle">SINH VIÊN</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toStudents}>
              <PersonOutline className="sidebarIcon" />
              Sinh viên
            </li>
            <li className="sidebarListItem">
              <GradeOutlined className="sidebarIcon" />
              Tiêu biểu
            </li>
            <li className="sidebarListItem">
              <NotInterested className="sidebarIcon" />
              Cảnh cáo
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">GIAO TIẾP</h3>
          <ul className="sidebarList">
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
