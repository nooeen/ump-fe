/* eslint-disable react-hooks/exhaustive-deps */
import Stack from "@mui/material/Stack";
import Chart from "../../components/chart/Chart";
import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./Dashboard.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import StudentService from "../../services/student.service";
import ManagerService from "../../services/manager.service";
import AuthService from "../../services/auth.service";

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [classes, setClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [studentsNumber, setStudentsNumber] = useState();

  const handleSetCurrentClass = (e) => {
    setCurrentClass(e.target.dataset.value);
    fetchStudentsNumber();
  };

  const fetchStudentsNumber = async () => {
    setStudentsNumber(await StudentService.getClassNumber(currentClass));
  };

  const fetchData = async () => {
    const managerClasses = await ManagerService.getManagerClasses();
    if (managerClasses.toString() !== classes.toString()) {
      await setClasses(managerClasses);
    }
    if (classes && !currentClass) {
      await setCurrentClass(classes[0]);
      await setStudentsNumber(await StudentService.getClassNumber(classes[0]));
    }
  };

  useEffect(() => {
    setShow(false);
    if (AuthService.isManager()) {
      fetchData();
      setShow(true);
    }
  }, [classes]);

  return (
    <div>
      {show ? (
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="dashboard">
              <FeaturedInfo
                selectedClass={currentClass}
                studentsNumber={studentsNumber}
                classAverage={8.5}
              />
              <Chart
                data={gradeData}
                title="Điểm trung bình lớp theo thời gian"
                grid
                dataKey="Điểm"
              />
              <Stack direction="row" spacing={2} className="dashboard-stack">
                {classes.map((e) => (
                  <button
                    className="button"
                    key={e}
                    data-value={e}
                    onClick={(e) => handleSetCurrentClass(e)}
                  >
                    {e}
                  </button>
                ))}
              </Stack>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
