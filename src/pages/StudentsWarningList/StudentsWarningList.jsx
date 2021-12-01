import React from "react";
import "./StudentsWarningList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Create, Search, Email } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";
import EmailService from "../../services/email.service";

export default function StudentsWarningList() {
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    const result = await StudentService.getWarningStudentsByClass();
    await setData(result);
    await setBusy(false);
  };

  const handleViewEdit = (id) => {
    const path = "/student/info?username=" + id;
    history.push(path);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleRefresh = () => {
    history.go(0);
  };

  const [emailSnackbar, setEmailSnackbar] = useState(false);

  const handleEmailSnackbar = () => {
    setEmailSnackbar(false);
  };

  const emailSnackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleEmailSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleEmail = async (id) => {
    const username = id;
    const context = await StudentService.getWarningContext(username);
    await EmailService.sendWarningEmail(username, context);
    setEmailSnackbar(true);
  };

  const handleEmailAll = async () => {
    data.forEach((e) => {
      handleEmail(e.username);
    });
  };

  useEffect(() => {
    fetchData();
    return;
  }, []);

  const columns = [
    { field: "username", headerName: "Mã sinh viên", width: 150 },
    {
      field: "fullname",
      headerName: "Họ và tên",
      width: 180,
    },
    { field: "class", headerName: "Lớp", width: 150 },
    { field: "currentGPA", headerName: "GPA", width: 100, hide: true },
    { field: "currentTPA", headerName: "TPA", width: 100, hide: true },
    { field: "credits", headerName: "Tín chỉ", width: 120, hide: true },
    {
      field: "warningcontext",
      headerName: "Lý do",
      width: 480,
    },
    {
      field: "action",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Search
              className="studentsListView"
              onClick={() => handleViewEdit(params.row.id)}
            />
            <Create
              className="studentsListEdit"
              onClick={() => handleViewEdit(params.row.id)}
            />
            <DeleteOutline
              className="studentsListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
            <Email
              className="studentsListEmail"
              onClick={() => handleEmail(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  console.log(data);

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
            <Sidebar />
            <div className="studentsList">
              <Stack direction="row" spacing={2} className="stack">
                <button className="button" onClick={handleEmailAll}>
                  GỬI EMAIL CẢNH CÁO
                </button>
                <button className="button" onClick={handleRefresh}>
                  LÀM MỚI TRANG
                </button>
              </Stack>
              <DataGrid
                style={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
                columns={columns}
                rows={data}
                rowKey="username"
                autoHeight
                disableSelectionOnClick
                rowsPerPageOptions={[10]}
                pageSize={10}
              />
              <Snackbar
                open={emailSnackbar}
                autoHideDuration={6000}
                onClose={handleEmailSnackbar}
                message="Đã gửi email!"
                action={emailSnackbarAction}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
