/* eslint-disable react-hooks/exhaustive-deps */
import "./FeaturedInfo.css";
// import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
// import { useEffect, useState } from "react";

export default function FeaturedInfo(props) {
  const selectedClass = props.selectedClass;
  const classAverage = props.classAverage;
  const studentsNumber = props.studentsNumber;
  // const [classStatus, setClassStatus] = useState();

  // const setStatus = () => {
  //   if (classAverage - schoolAverage > 0) {
  //     const difference = (classAverage - schoolAverage).toFixed(2);
  //     const status = "+" + difference;
  //     setClassStatus(status);
  //   } else if (classAverage - schoolAverage < 0) {
  //     const difference = (schoolAverage - classAverage).toFixed(2);
  //     const status = "-" + difference;
  //     setClassStatus(status);
  //   }
  // };

  // useEffect(() => {
  //   // setStatus();
  // }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Lớp</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{selectedClass}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Số sinh viên</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{studentsNumber}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Điểm trung bình lớp</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{classAverage}</span>
          {/* <span className="featuredMoneyRate">
            {classStatus}
            {classStatus && classStatus[0] === "+" ? (
              <ArrowUpward className="featuredIcon" />
            ) : null}
            {classStatus && classStatus[0] === "-" ? (
              <ArrowDownward className="featuredIcon" />
            ) : null}
          </span> */}
        </div>
        {/* <span className="featuredSub">So với điểm toàn trường</span> */}
      </div>
    </div>
  );
}
