import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserService from "./services/user.service";
import AuthService from "./services/auth.service";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentsList from "./pages/StudentsList/StudentsList";
import SignIn from "./pages/SignIn/SignIn";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import Home from "./pages/Home/Home";
import NewStudent from "./pages/NewStudent/NewStudent";

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
          {AuthService.logout}
        </Route>
        {UserService.isManager ? (
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        ) : null}
        {UserService.isUser ? (
          <Route exact path="/dashboard">
            <StudentDashboard />
          </Route>
        ) : null}
        <Route exact path="/student">
          <StudentsList />
        </Route>
        <Route exact path="/student/add">
          <NewStudent />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
