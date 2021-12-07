/* eslint-disable react-hooks/exhaustive-deps */
import { CalendarToday, PermIdentity, PhoneAndroid } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ManagerService from "../../services/manager.service";
import AuthService from "../../services/auth.service";
import "./ManagerInfo.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import StudentSidebar from "components/studentsidebar/StudentSidebar";

export default function StudentInfo() {
  const history = useHistory();
  const [isManager, setIsManager] = useState(null);
  const [user, setUser] = useState(null);
  const [userDOB, setUserDOB] = useState(null);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const fetchManager = async () => {
      const managerStatus = await AuthService.isManager();
      if (managerStatus === false) {
        setIsManager(false);
      } else if (managerStatus === true) {
        setIsManager(true);
      }
    };
    const fetchData = async () => {
      if (isManager === true) {
        const result = await ManagerService.getCurrentManager();
        await setUser(result);
        await setUserDOB(new Date(result.dob).toLocaleDateString("vi-VN"));
        await setBusy(false);
      } else if (isManager === false) {
        const result = await ManagerService.getCurrentManagerFromStudent();
        await setUser(result);
        await setUserDOB(new Date(result.dob).toLocaleDateString("vi-VN"));
        await setBusy(false);
      }
    };
    fetchManager();
    fetchData();
  }, [isManager]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const manager_username = event.target.username.value;
    const manager_fullname = event.target.fullname.value;
    const manager_phone = event.target.phone.value;
    const manager_avatar = event.target.avatar.value;

    await ManagerService.updateManager(
      manager_username,
      manager_fullname,
      manager_phone,
      manager_avatar
    );
    history.go(0);
  };

  return (
    <div>
      {isBusy ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "95vh" }}
        >
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        </Grid>
      ) : (
        <div>
          <Topbar />
          <div className="container">
            {isManager ? <Sidebar /> : <StudentSidebar />}
            <div className="user">
              <div className="userContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    <img src={user.avatar} alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">{user.fullname}</span>
                      <span className="userShowUserTitle">{user.class}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Thông tin cơ bản</span>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.username}</span>
                    </div>
                    <div className="userShowInfo">
                      <CalendarToday className="userShowIcon" />
                      <span className="userShowInfoTitle">{userDOB}</span>
                    </div>
                    <span className="userShowTitle">Thông tin liên lạc</span>
                    <div className="userShowInfo">
                      <PhoneAndroid className="userShowIcon" />
                      <span className="userShowInfoTitle">{user.phone}</span>
                    </div>
                    <span className="userShowTitle">Lớp đang quản lý</span>
                    {user.classes.map((e) => (
                      <div className="userShowInfo" key={e}>
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {isManager ? (
                  <div className="userUpdate">
                    <h1 className="userUpdateTitle">Cập nhật thông tin</h1>
                    <form className="userUpdateForm" onSubmit={handleSubmit}>
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Tên đăng nhập</label>
                          <input
                            type="text"
                            value={user.username}
                            name="username"
                            className="userUpdateInput"
                            disabled
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Họ và tên</label>
                          <input
                            type="text"
                            name="fullname"
                            defaultValue={user.fullname}
                            className="userUpdateInput"
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Số điện thoại cá nhân</label>
                          <input
                            type="text"
                            name="phone"
                            defaultValue={user.phone}
                            className="userUpdateInput"
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Avatar URL</label>
                          <input
                            type="text"
                            name="avatar"
                            defaultValue={user.avatar}
                            className="userUpdateInput"
                          />
                        </div>
                        <div className="userUpdateItem">
                          <button className="userUpdateButton">Cập nhật</button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
