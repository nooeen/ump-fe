// import Chart from "../../components/chart/Chart";
// import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./StudentDashboard.css";
import Topbar from "../../components/topbar/Topbar";
import StudentSidebar from "../../components/studentsidebar/StudentSidebar";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";

export default function StudentDashboard() {
  const [show, setShow] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setShow(false);
    if (AuthService.isStudent() && !AuthService.isManager()) {
      setShow(true);
    }
    if (!AuthService.isUser()) {
      history.push("/login");
    }
  }, [history]);

  return (
    <div>
      {show ? (
        <div>
          <Topbar />
          <div className="container">
            <StudentSidebar />
            <div className="dashboard">
              <FeaturedInfo />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
