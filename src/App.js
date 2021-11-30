import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SignIn/SignIn";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Home from "./pages/Home/Home";
import SignOut from "./pages/SignOut/SignOut";
import StudentsList from "pages/StudentsList/StudentsList";
import StudentsWarningList from "pages/StudentsWarningList/StudentsWarningList";
import StudentsBonusList from "pages/StudentsBonusList/StudentsBonusList";
import StudentAdd from "./pages/StudentAdd/StudentAdd";
import StudentInfo from "pages/StudentInfo/StudentInfo";
import Notifications from "./pages/Notifications/Notifications";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/logout">
          <SignOut />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
          <StudentDashboard />
        </Route>
        <Route exact path="/students">
          <StudentsList />
        </Route>
        <Route exact path="/students/warning">
          <StudentsWarningList />
        </Route>
        <Route exact path="/students/bonus">
          <StudentsBonusList />
        </Route>
        <Route exact path="/student/info">
          <StudentInfo />
        </Route>
        <Route exact path="/student/add">
          <StudentAdd />
        </Route>
        <Route exact path="/notifications">
          <Notifications />
        </Route>
        <Route exact path="/chat"></Route>
      </Switch>
    </Router>
  );
}

export default App;
