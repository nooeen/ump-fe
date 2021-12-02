import "./StudentAdd.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";
import ManagerService from "../../services/manager.service";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function StudentAdd() {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [isBusy, setBusy] = useState(true);

  const fetchData = async () => {
    const data = await ManagerService.getManagerClasses();
    await setClasses(data);
    await setBusy(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const student_username = event.target.username.value;
    const student_password = event.target.password.value;
    const student_fullname = event.target.fullname.value;
    const student_class = event.target.class.value;
    const student_dob = event.target.dob.value;
    const student_phone = event.target.student_phone.value;
    const parent_phone = event.target.parent_phone.value;
    const student_address = event.target.address.value;
    const student_avatar = event.target.avatar.value;

    console.log(
      student_username,
      student_password,
      student_fullname,
      student_class,
      student_dob,
      student_phone,
      parent_phone,
      student_address,
      student_avatar
    );
    //Gọi API tạo documents
    await StudentService.addStudent(
      student_username,
      student_password,
      student_fullname,
      student_class,
      student_dob,
      student_phone,
      parent_phone,
      student_address,
      student_avatar
    );

    //Redirect tới trang edit
    if (
      student_username !== "" &&
      student_password !== "" &&
      student_fullname !== "" &&
      student_class !== "" &&
      student_dob !== "" &&
      student_phone !== "" &&
      parent_phone !== "" &&
      student_address !== "" &&
      student_avatar !== ""
    ) {
      const path = "/student/info?username=" + student_username;
      history.push(path);
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="dashboard">
          <div className="newStudent">
            <h1 className="newStudentTitle">Thêm sinh viên</h1>
            <form className="newStudentForm" onSubmit={handleSubmit}>
              <div className="newStudentItem">
                <label>Mã sinh viên</label>
                <input type="text" placeholder="19021000" name="username" />
              </div>
              <div className="newStudentItem">
                <label>Mật khẩu</label>
                <input type="password" placeholder="********" name="password" />
              </div>
              <div className="newStudentItem">
                <label>Họ và tên</label>
                <input type="text" placeholder="Nguyễn Văn A" name="fullname" />
              </div>
              <div className="newStudentItem">
                <label>Lớp</label>
                {isBusy ? (
                  <input
                    type="text"
                    placeholder="QH-2020-I/CQ-E"
                    name="class"
                  />
                ) : (
                  <select name="class" id="class">
                    {classes.map((c) => (
                      <option value={c} key={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="newStudentItem">
                <label>Ngày sinh</label>
                <input type="date" placeholder="01/01/2000" name="dob" />
              </div>
              <div className="newStudentItem">
                <label>Số điện thoại sinh viên</label>
                <input
                  type="text"
                  placeholder="0966779508"
                  name="student_phone"
                />
              </div>
              <div className="newStudentItem">
                <label>Số điện thoại phụ huynh</label>
                <input
                  type="text"
                  placeholder="0966779508"
                  name="parent_phone"
                />
              </div>
              <div className="newStudentItem">
                <label>Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Thôn 2, Hoàng Cương, Thanh Ba, Phú Thọ"
                  name="address"
                />
              </div>
              <div className="newStudentItem">
                <label>Avatar URL</label>
                <input
                  type="text"
                  placeholder="https://google.com"
                  name="avatar"
                />
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
