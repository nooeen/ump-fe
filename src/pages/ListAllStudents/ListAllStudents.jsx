import axios from "axios";
import "./ListAllStudents.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const API_URL = process.env.REACT_APP_URL;

function ListAllStudents() {
  const [data, setData] = useState({ username: "0" });
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL + "/api/student/listAll")
      .then((res) => res.data)
      .then((resJson) => {
        const result = resJson.map((row) => ({
          id: row.username,
          username: row.username,
          fullname: row.fullname,
          class: row.class,
        }));
        setData(result);
        setBusy(false);
      });
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  console.log(data);

  const columns = [
    { field: "username", headerName: "MSV", width: 120 },
    {
      field: "fullname",
      headerName: "TÊN SINH VIÊN",
      width: 200,
    },
    { field: "class", headerName: "LỚP", width: 200 },
    {
      field: "action",
      headerName: "HÀNH ĐỘNG",
      width: 150,
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
                rows={data}
                rowKey="username"
                disableSelectionOnClick
                columns={columns}
                pageSize={20}
                checkboxSelection
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListAllStudents;
