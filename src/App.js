import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentsList from "./pages/StudentsList/StudentsList";
import SignIn from "./pages/SignIn/SignIn";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import NewStudent from "./pages/NewStudent/NewStudent";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/studentdashboard">
          <StudentDashboard />
        </Route>
        <Route exact path="/student">
          <StudentsList />
        </Route>
        <Route exact path="/student/add">
          <NewStudent/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
