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
import { useHistory } from "react-router-dom";


export default function Sidebar() {
  const history = useHistory();

  const toHome = () =>{ 
    let path = `/dashboard`; 
    history.push(path);
  }

  const toStudents = () =>{ 
    let path = `/students`; 
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
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Thông số
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">MENU NHANH</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem" onClick={toStudents}>
              <PersonOutline className="sidebarIcon" />
              Học sinh
            </li>
            <li className="sidebarListItem">
              <GradeOutlined className="sidebarIcon" />
              Điểm
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
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">NHẬP / XUẤT DỮ LIỆU</h3>
        </div>
      </div>
    </div>
  );
}
