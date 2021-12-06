import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Notifications.css";
import Notification from "../../components/notification/notification";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentSidebar from "../../components/studentsidebar/StudentSidebar";
// import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";

export default function Notifications() {
  const [isManager, setIsManager] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setIsManager(false);
    if (!AuthService.isUser()) {
      history.push("/login");
    }
    if (AuthService.isManager()) {
      setIsManager(true);
    }
  }, []);

  return (
    <div>
      <Topbar />
      <div className="container">
        {isManager ? <Sidebar /> : <StudentSidebar />}
        <div className="notifications">
          <h1>Thông báo</h1>
          <Notification
            title="Lizard"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
          ></Notification>
          <Notification
            title="Lizard"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
          ></Notification>
          <Notification
            title="Lizard"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
          ></Notification>
          <Notification
            title="Lizard"
            content="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
          ></Notification>
        </div>
      </div>
    </div>
  );
}
