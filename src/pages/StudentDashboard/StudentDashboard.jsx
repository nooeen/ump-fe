/* eslint-disable react-hooks/exhaustive-deps */
import "./StudentDashboard.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import StudentSidebar from "../../components/studentsidebar/StudentSidebar";
import {
  CalendarToday,
  LocationSearching,
  People,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import AuthService from "../../services/auth.service";
import StudentService from "../../services/student.service";

export default function StudentDashboard() {
  const [isBusy, setBusy] = useState(true);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const [user, setUser] = useState();
  const [userDOB, setUserDOB] = useState();

  useEffect(() => {
    setShow(false);
    const fetchData = async () => {
      const username = AuthService.getUsername();
      const result = await StudentService.getStudent(username);
      await setUser(result);
      await setUserDOB(new Date(result.dob).toLocaleDateString("vi-VN"));
      await setBusy(false);
    };
    if (AuthService.isStudent() && !AuthService.isManager()) {
      setShow(true);
      fetchData();
    }
    if (!AuthService.isUser()) {
      history.push("/login");
    }
  }, [history]);

  return (
    <div>
      {show ? (
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
              {show ? (
                <div>
                  <Topbar />
                  <div className="container">
                    <StudentSidebar />
                    <div className="dashboard">
                      <div className="user">
                        <div className="userContainer">
                          <div className="userShow">
                            <div className="userShowTop">
                              <img
                                src={user.avatar}
                                alt=""
                                className="userShowImg"
                              />
                              <div className="userShowTopTitle">
                                <span className="userShowUsername">
                                  {user.fullname}
                                </span>
                                <span className="userShowUserTitle">
                                  {user.class}
                                </span>
                              </div>
                            </div>
                            <div className="userShowBottom">
                              <span className="userShowTitle">
                                Thông tin cơ bản
                              </span>
                              <div className="userShowInfo">
                                <PermIdentity className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                  {user.username}
                                </span>
                              </div>
                              <div className="userShowInfo">
                                <CalendarToday className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                  {userDOB}
                                </span>
                              </div>
                              <span className="userShowTitle">
                                Thông tin liên lạc
                              </span>
                              <div className="userShowInfo">
                                <PhoneAndroid className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                  {user.student_phone}
                                </span>
                              </div>
                              <div className="userShowInfo">
                                <People className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                  {user.parent_phone}
                                </span>
                              </div>
                              <div className="userShowInfo">
                                <LocationSearching className="userShowIcon" />
                                <span className="userShowInfoTitle">
                                  {user.address}
                                </span>
                              </div>
                              <span className="userShowTitle">Tình trạng</span>
                              <div className="userShowInfo">
                                <span>
                                  <b>GPA: </b>
                                </span>
                                <span className="userShowInfoTitle">
                                  {user.currentGPA}
                                </span>
                              </div>
                              <div className="userShowInfo">
                                <span>
                                  <b>Điểm chuyên cần: </b>
                                </span>
                                <span className="userShowInfoTitle">
                                  {user.currentTPA}
                                </span>
                              </div>
                              <div className="userShowInfo">
                                <span>
                                  <b>Số tín chỉ: </b>
                                </span>
                                <span className="userShowInfoTitle">
                                  {user.currentCredits}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="userStatus">
                            <h1 className="userUpdateTitle">
                              Tình hình học tập
                            </h1>
                            {user
                              ? user.history.map((term) => {
                                  const name =
                                    "20" +
                                    term.term.split("_")[0] +
                                    " - 20" +
                                    term.term.split("_")[1] +
                                    " | HK" +
                                    term.term.split("_")[2];
                                  return (
                                    <div key={term.term}>
                                      <span className="userShowTitle">
                                        {name}
                                      </span>
                                      <div className="userShowInfo">
                                        <span>
                                          <b>GPA: </b>
                                        </span>
                                        <span className="userShowInfoTitle">
                                          {term.gpa}
                                        </span>
                                      </div>
                                      <div className="userShowInfo">
                                        <span>
                                          <b>Chuyên cần: </b>
                                        </span>
                                        <span className="userShowInfoTitle">
                                          {term.tpa}
                                        </span>
                                      </div>
                                      <div className="userShowInfo">
                                        <span>
                                          <b>Số tín chỉ: </b>
                                        </span>
                                        <span className="userShowInfoTitle">
                                          {term.credits}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })
                              : null}
                          </div>
                          <div className="userUpdate">
                            <h1 className="userUpdateTitle">
                              Cập nhật thông tin
                            </h1>
                            <form className="userUpdateForm">
                              <div className="userUpdateLeft">
                                <div className="userUpdateItem">
                                  <label>Mã sinh viên</label>
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
                                    defaultValue={user.student_phone}
                                    className="userUpdateInput"
                                  />
                                </div>
                                <div className="userUpdateItem">
                                  <label>Số điện thoại phụ huynh</label>
                                  <input
                                    type="text"
                                    defaultValue={user.parent_phone}
                                    className="userUpdateInput"
                                  />
                                </div>
                                <div className="userUpdateItem">
                                  <label>Địa chỉ</label>
                                  <input
                                    type="text"
                                    defaultValue={user.address}
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
                                  <button className="userUpdateButton">
                                    Cập nhật
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
