import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./components/layout/Main";
import Property from "./pages/property/Property";

import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Todos from "./pages/todos/Todos";
import Categories from "./pages/categories/Categories";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import RestrictedRoute from "./components/restrictedRoute/RestrictedRoute";
import Reports from "./pages/reports/Reports";
import Agreement from "./pages/agreement/Agreement";
import Profiles from "./pages/profiles/Profiles";
function App() {
  const user = useSelector((state) => state.login.user);
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={Login} />
        <Main>
          <RestrictedRoute exact path="/profiles" user={user} component={Profiles} />
          <RestrictedRoute exact path="/dashboard" user={user} component={Home} />
          <RestrictedRoute exact path="/property" user={user} component={Property} />
          <RestrictedRoute exact path="/category" user={user} component={Categories} />
          <RestrictedRoute exact path="/todos" user={user} component={Todos} />
          <RestrictedRoute exact path="/reports" user={user} component={Reports} />
          <RestrictedRoute exact path="/agreements" user={user} component={Agreement} />
          <Redirect from="*" to="/todos" />
        </Main>
      </Switch>
    </div>

  );
}

export default App;
