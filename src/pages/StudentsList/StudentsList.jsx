import React from "react";
import "./StudentsList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline, Create, Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import StudentService from "../../services/student.service";

export default function StudentsList() {
  const [data, setData] = useState([]);
  const [isBusy, setBusy] = useState(true);

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

  useEffect(() => {
    fetchData();
    setBusy(false);
  }, []);

  const columns = [
    { field: "username", headerName: "Mã sinh viên", width: 150 },
    {
      field: "fullname",
      headerName: "Họ và tên",
      width: 200,
    },
    { field: "class", headerName: "Lớp", width: 180 },
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
      {isBusy ? null : (
        <div>
          <Topbar />
          <div className="container">
            <Sidebar />
            <div className="studentsList">
              <DataGrid
                columns={columns}
                rows={data}
                rowKey="username"
                autoHeight
                disableSelectionOnClick
                pageSize={10}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
