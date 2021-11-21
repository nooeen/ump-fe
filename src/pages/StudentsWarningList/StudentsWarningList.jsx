import React from "react";
import "./StudentsWarningList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Create, Search, Email } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";

export default function StudentsWarningList() {
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    const result = await StudentService.getWarningStudentsByClass();
    setData(result);
  };

  const handleView = (id) => {
    console.log(id);
  };

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleEmail = (id) => {
    console.log(id);
  };

  const handleRefresh = () => {
    history.go(0);
  };

  useEffect(() => {
    fetchData();
    setBusy(false);
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
                <button class="button">GỬI EMAIL CẢNH CÁO</button>
                <button class="button" onClick={handleRefresh}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
