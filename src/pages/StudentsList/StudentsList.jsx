import React from "react";
import "./StudentsList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Create, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import CircularProgress from '@mui/material/CircularProgress';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";

export default function StudentsList() {
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    const result = await StudentService.getStudentsByClass();
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

  const handleRefresh = () => {
    history.go(0);
  };

  const handleAdd = () => {
    history.go(0);
  };

  const handleImport = () => {
    history.go(0);
  };

  const handleExport = () => {
    history.go(0);
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
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        if (params.row.status === "CẢNH BÁO") {
          return <div className="studentsListWarning">{params.row.status}</div>;
        } else if (params.row.status === "KHEN THƯỞNG") {
          return <div className="studentsListBonus">{params.row.status}</div>;
        } else {
          return <div>{params.row.status}</div>;
        }
      },
    },
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
          </>
        );
      },
    },
  ];

  return (
    <div>
      {isBusy ? <CircularProgress /> : (
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="studentsList">
              <Stack direction="row" spacing={2} className="stack">
                <button className="button" onClick={handleAdd}>THÊM SINH VIÊN</button>
                <button className="button" onClick={handleImport}>NHẬP DỮ LIỆU</button>
                <button className="button" onClick={handleExport}>XUẤT DỮ LIỆU</button>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
