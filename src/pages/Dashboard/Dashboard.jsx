import Chart from "../../components/chart/Chart";
import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Dashboard.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function Dashboard() {
  return (
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
  );
}
