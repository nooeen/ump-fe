import React from "react";
import "./StudentsList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    fetchData();
    setBusy(false);
  }, []);

  const handleDelete = (id) => {};

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
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
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
