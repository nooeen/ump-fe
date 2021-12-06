import "./NotificationAdd.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import StudentService from "../../services/student.service";
import ManagerService from "../../services/manager.service";
import NotificationService from "../../services/notification.service";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NotificationAdd() {
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
    const notification_title = event.target.title.value;
    const notification_class = event.target.class.value;
    const notification_content = event.target.content.value;

    //Gọi API tạo documents
    await NotificationService.add(
      notification_title,
      notification_class,
      notification_content
    );

    //Redirect tới trang edit
    if (
      notification_title !== "" &&
      notification_class !== "" &&
      notification_content !== ""
    ) {
      const path = "/notifications";
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
            <h1 className="newStudentTitle">Thêm thông báo</h1>
            <form className="newStudentForm" onSubmit={handleSubmit}>
              <div className="newStudentItem">
                <label>Tiêu đề</label>
                <input
                  type="text"
                  placeholder="Tiêu đề thông báo"
                  name="title"
                />
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
                <label>Nội dung</label>
                <input
                  type="text"
                  placeholder="Xin tài trợ 1 tỷ đồng cho quỹ học bổng..."
                  name="content"
                />
              </div>
              <button className="newStudentButton">Thêm thông báo</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
