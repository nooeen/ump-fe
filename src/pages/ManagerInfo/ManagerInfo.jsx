/* eslint-disable react-hooks/exhaustive-deps */
import { CalendarToday, PermIdentity, PhoneAndroid } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ManagerService from "../../services/manager.service";
import AuthService from "../../services/auth.service";
import "./ManagerInfo.css";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import StudentSidebar from "components/studentsidebar/StudentSidebar";

export default function StudentInfo() {
  const [isManager, setIsManager] = useState(null);
  const [user, setUser] = useState();
  const [userDOB, setUserDOB] = useState();
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    if (AuthService.isStudent() && !AuthService.isManager()) {
      setIsManager(false);
    } else {
      setIsManager(true);
    }
    const fetchData = async () => {
      if (isManager) {
        const result = await ManagerService.getCurrentManager();
        await setUser(result);
        await setUserDOB(new Date(result.dob).toLocaleDateString("vi-VN"));
        await setBusy(false);
      } else {
        const result = await ManagerService.getCurrentManagerFromStudent();
        await setUser(result);
        await setUserDOB(new Date(result.dob).toLocaleDateString("vi-VN"));
        await setBusy(false);
      }
    };
    fetchData();
  }, []);

  console.log(user);

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
                      <div className="userShowInfo">
                        <span>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {isManager ? (
                  <div className="userUpdate">
                    <h1 className="userUpdateTitle">Cập nhật thông tin</h1>
                    <form className="userUpdateForm">
                      <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                          <label>Tên đăng nhập</label>
                          <input
                            type="text"
                            value={user.username}
                            className="userUpdateInput"
                            disabled
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Họ và tên</label>
                          <input
                            type="text"
                            defaultValue={user.fullname}
                            className="userUpdateInput"
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Số điện thoại cá nhân</label>
                          <input
                            type="text"
                            defaultValue={user.phone}
                            className="userUpdateInput"
                          />
                        </div>
                        <div className="userUpdateItem">
                          <label>Avatar URL</label>
                          <input
                            type="text"
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
