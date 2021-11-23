import "./StudentAdd.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

export default function StudentAdd() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="dashboard">
          <div className="newStudent">
            <h1 className="newStudentTitle">Thêm sinh viên</h1>
            <form className="newStudentForm">
              <div className="newStudentItem">
                <label>Mã sinh viên</label>
                <input type="text" placeholder="19021000" />
              </div>
              <div className="newStudentItem">
                <label>Password</label>
                <input type="password" placeholder="password" />
              </div>
              <div className="newStudentItem">
                <label>Họ và tên</label>
                <input type="text" placeholder="Nguyễn Văn A" />
              </div>
              <div className="newStudentItem">
                <label>Lớp</label>
                <input type="text" placeholder="QH-2020-I/CQ-E" />
              </div>
              <div className="newStudentItem">
                <label>Số điện thoại</label>
                <input type="text" placeholder="0966779508" />
              </div>
              <div className="newStudentItem">
                <label>Địa chỉ</label>
                <input type="text" placeholder="Thôn 2, Hoàng Cương, Thanh Ba, Phú Thọ" />
              </div>
              {/* <div className="newStudentItem">
                <label>Gender</label>
                <div className="newStudentGender">
                  <input type="radio" name="gender" id="male" value="male" />
                  <label for="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label for="female">Female</label>
                  <input type="radio" name="gender" id="other" value="other" />
                  <label for="other">Other</label>
                </div>
              </div> */}
              {/* <div className="newStudentItem">
                <label>Active</label>
                <select className="newStudentSelect" name="active" id="active">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div> */}
              <button className="newStudentButton">Thêm sinh viên</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
