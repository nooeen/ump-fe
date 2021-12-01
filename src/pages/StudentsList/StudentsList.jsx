import React from "react";
import "./StudentsList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Create, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";

export default function StudentsList() {
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    const result = await StudentService.getStudentsByClass();
    await setData(result);
    await setBusy(false);
  };

  const handleRefresh = () => {
    history.go(0);
  };

  const handleAdd = () => {
    const path = "/student/add";
    history.push(path);
  };

  const handleViewEdit = (id) => {
    const path = "/student/info?username=" + id;
    history.push(path);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleImport = () => {
    history.go(0);
  };

  const handleExport = () => {
    history.go(0);
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
      width: 160,
    },
    { field: "class", headerName: "Lớp", width: 160 },
    { field: "currentGPA", headerName: "GPA", width: 110 },
    { field: "currentTPA", headerName: "ĐRL", width: 110 },
    { field: "credits", headerName: "Số tín chỉ", width: 140 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 140,
      renderCell: (params) => {
        if (params.row.status === "CẢNH BÁO") {
          return <Chip label="Cảnh báo" color="error" />;
        } else if (params.row.status === "KHEN THƯỞNG") {
          return <Chip label="Khen thưởng" color="primary" />;
        } else {
          return <Chip label="Bình thường" color="default" />;
        }
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 145,
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
          </>
        );
      },
    },
  ];

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
                <button className="button" onClick={handleAdd}>
                  THÊM SINH VIÊN
                </button>
                <button className="button" onClick={handleImport}>
                  NHẬP DỮ LIỆU
                </button>
                <button className="button" onClick={handleExport}>
                  XUẤT DỮ LIỆU
                </button>
                <button className="button" onClick={handleRefresh}>
                  VỀ THỨ TỰ CŨ
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
