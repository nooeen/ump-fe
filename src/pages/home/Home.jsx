import Chart from "../../components/chart/Chart"
import { gradeData } from "../../dummyData";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./Home.css"

export default function Home() {
    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={gradeData} title="Điểm trung bình lớp theo thời gian" grid dataKey="Điểm"/>
        </div>
    )
}
