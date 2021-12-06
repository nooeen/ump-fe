/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Notifications.css";
import Notification from "../../components/notification/notification";
import Stack from "@mui/material/Stack";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentSidebar from "../../components/studentsidebar/StudentSidebar";
// import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";
import NotificationService from "../../services/notification.service";

export default function Notifications() {
  const [isManager, setIsManager] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (AuthService.isManager()) {
        setIsManager(true);
        const data = await NotificationService.listformanager();
        setNotifications(data);
      } else {
        setIsManager(false);
        const data = await NotificationService.listforstudent();
        setNotifications(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Topbar />
      <div className="container">
        {isManager ? <Sidebar /> : <StudentSidebar />}
        <div className="notifications">
          <h1>Thông báo</h1>
          {isManager ? (
            <div>
              <Stack direction="row" spacing={2} className="stack">
                <button className="button">THÊM THÔNG BÁO</button>
              </Stack>
            </div>
          ) : null}
          {notifications.map((e) => (
            <Notification
              title={e.title}
              class={e.class}
              content={e.content}
              key={e._id}
              isManager={isManager}
            ></Notification>
          ))}
        </div>
      </div>
    </div>
  );
}
