import React from "react";
import "./StudentsBonusList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Create, Search, Email } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";
import EmailService from "../../services/email.service";

export default function StudentsBonusList() {
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    const result = await StudentService.getBonusStudentsByClass();
    setData(result);
  };

  const handleView = (id) => {
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleRefresh = () => {
    history.go(0);
  };

  const handleDelete = (id) => {
    console.log(id);
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
    await EmailService.sendBonusEmail(id);
    setEmailSnackbar(true);
  };

  const handleEmailAll = async () => {
    data.forEach((e) => {
      handleEmail(e.username);
    });
  };

  useEffect(() => {
    fetchData();
    setBusy(false);
    return;
  }, []);

  const columns = [
    { field: "username", headerName: "Mã sinh viên", width: 150 },
    {
      field: "fullname",
      headerName: "Họ và tên",
      width: 180,
    },
    { field: "class", headerName: "Lớp", width: 180 },
    { field: "currentGPA", headerName: "GPA", width: 100 },
    { field: "currentTPA", headerName: "TPA", width: 100 },
    { field: "credits", headerName: "Tín chỉ", width: 120 },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Search
              className="studentsListView"
              onClick={() => handleView(params.row.id)}
            />
            <Create
              className="studentsListEdit"
              onClick={() => handleEdit(params.row.id)}
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

  return (
    <div>
      {isBusy ? null : (
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="studentsList">
              <Stack direction="row" spacing={2} className="stack">
                <button className="button" onClick={handleEmailAll}>
                  GỬI EMAIL KHEN THƯỞNG
                </button>
                <button className="button" onClick={handleRefresh}>
                  LÀM MỚI TRANG
                </button>
              </Stack>
              <DataGrid
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
