import Chart from "../../components/chart/Chart";
import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./StudentDashboard.css";
import Topbar from "../../components/topbar/Topbar";
import StudentSidebar from "../../components/studentsidebar/StudentSidebar";

export default function StudentDashboard() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <StudentSidebar />
        <div className="dashboard">
          <FeaturedInfo />
        </div>
      </div>
    </div>
  );
}
