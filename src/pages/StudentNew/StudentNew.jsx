import "./StudentNew.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


export default function StudentNew() {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="dashboard">
          <div className="newStudent">
            <h1 className="newStudentTitle">New User</h1>
            <form className="newStudentForm">
              <div className="newStudentItem">
                <label>Username</label>
                <input type="text" placeholder="john" />
              </div>
              <div className="newStudentItem">
                <label>Full Name</label>
                <input type="text" placeholder="John Smith" />
              </div>
              <div className="newStudentItem">
                <label>Email</label>
                <input type="email" placeholder="john@gmail.com" />
              </div>
              <div className="newStudentItem">
                <label>Password</label>
                <input type="password" placeholder="password" />
              </div>
              <div className="newStudentItem">
                <label>Phone</label>
                <input type="text" placeholder="+1 123 456 78" />
              </div>
              <div className="newStudentItem">
                <label>Address</label>
                <input type="text" placeholder="New York | USA" />
              </div>
              <div className="newStudentItem">
                <label>Gender</label>
                <div className="newStudentGender">
                  <input type="radio" name="gender" id="male" value="male" />
                  <label for="male">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label for="female">Female</label>
                  <input type="radio" name="gender" id="other" value="other" />
                  <label for="other">Other</label>
                </div>
              </div>
              <div className="newStudentItem">
                <label>Active</label>
                <select className="newStudentSelect" name="active" id="active">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <button className="newStudentButton">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
