import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ListAllStudents from "./pages/ListAllStudents/ListAllStudents";
import SignIn from "./pages/SignIn/SignIn";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Home from "./pages/Home/Home";
import NewStudent from "./pages/NewStudent/NewStudent";
import SignOut from "./pages/SignOut/SignOut";

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
        <Route exact path="/student">
          <ListAllStudents />
        </Route>
        <Route exact path="/student/add">
          <NewStudent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
