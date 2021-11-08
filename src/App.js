import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentsList from "./pages/StudentsList/StudentsList";
import SignIn from "./pages/SignIn/SignIn";

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
        <Route exact path="/students">
          <StudentsList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
