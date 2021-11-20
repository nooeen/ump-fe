import Chart from "../../components/chart/Chart";
import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Dashboard.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import StudentService from "../../services/student.service";
import AuthService from "../../services/auth.service";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [studentsNumber, setStudentsNumber] = useState();

  const fetchStudentsNumber = async () => {
    const raw = await StudentService.getNumberOfStudentsByClass();
    setStudentsNumber(raw);
  };

  useEffect(() => {
    setShow(false);
    if (AuthService.isManager()) {
      setShow(true);
      fetchStudentsNumber();
    }
  }, []);

  return (
    <div>
      {show ? (
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="dashboard">
              <FeaturedInfo studentsNumber={studentsNumber} />
              <Chart
                data={gradeData}
                title="Điểm trung bình lớp theo thời gian"
                grid
                dataKey="Điểm"
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
