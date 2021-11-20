import "./FeaturedInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo(props) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Sinh viên</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.studentsNumber}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Điểm trung bình toàn trường</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">7.2</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">So với kỳ trước</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Điểm trung bình lớp</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">8.0</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">So với kỳ trước</span>
      </div>
    </div>
  );
}