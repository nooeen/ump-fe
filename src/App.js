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
        <Route exact path="/dashboard">
          {UserService.isManager() ? <Dashboard /> : UserService.isUser() ? <StudentDashboard /> : <SignIn />}
        </Route>
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
