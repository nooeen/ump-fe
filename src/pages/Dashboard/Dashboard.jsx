import Chart from "../../components/chart/Chart";
import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Dashboard.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";

export default function Dashboard() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    if (AuthService.isManager()) {
      setShow(true);
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
              <FeaturedInfo />
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
