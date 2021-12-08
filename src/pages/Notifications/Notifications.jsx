/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Notifications.css";
import Notification from "../../components/notification/notification";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import CardContent from "@mui/material/CardContent";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentSidebar from "../../components/studentsidebar/StudentSidebar";
// import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";
import NotificationService from "../../services/notification.service";

export default function Notifications() {
  const [isManager, setIsManager] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!AuthService.isUser()) {
      history.push("/login");
    } else {
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
    }
  }, []);

  const toAddNotification = () => {
    const path = "/notification/add";
    history.push(path);
  };

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
                <button className="button" onClick={toAddNotification}>
                  THÊM THÔNG BÁO
                </button>
              </Stack>
            </div>
          ) : null}
          {notifications.map((e) => (
            <div key={e._id}>
              <Notification
                noti_id={e._id}
                title={e.title}
                class={e.class}
                content={e.content}
                isManager={isManager}
              ></Notification>
              {e.comments
                ? e.comments.map((e) => (
                    <div key={e}>
                      <Paper
                        variant="elevation"
                        sx={{
                          maxWidth: 480,
                          marginBottom: "5px",
                          paddingLeft: "3px",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                      >
                        <h5 style={{ marginBottom: "1px" }}>{e.username}</h5>
                        <p style={{ marginTop: "5px" }}>{e.content}</p>
                      </Paper>
                    </div>
                  ))
                : null}
              <div sx={{ marginBottom: "5px" }}>
                <form>
                  <span sx={{display: "inline"}}>
                    <input type="hidden" name="id" value={e._id} />
                    <div className="newItem">
                      <input
                        type="text"
                        placeholder="Nội dung"
                        name="content"
                      />
                      <button className="newButton">Đăng</button>
                    </div>
                  </span>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
