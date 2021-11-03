import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import SamplePage from "./pages/samplePage/SamplePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataFetching from "./apis/studentApi";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/sample">
            <SamplePage />
          </Route>
        </Switch>
      </div>
    </Router>
    //   <div className={App}>
    //     <DataFetching />
    //   </div>
  );
}

export default App;
