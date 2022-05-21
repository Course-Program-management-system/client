import { useEffect } from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
  HashRouter,
} from "react-router-dom";
import ChangePassword from "./Component/change-password/change-password";
import CreateUniversity from "./Component/create-university/create-university";
import Home from "./Component/Dashboard/Home";
import verifyAdmin from "./Component/Dashboard/roles/verify-email/verify-email";
import Login from "./Component/Login/Login";
import Toast from "./shared/Toast/Toast";
import initApiInterceptor from "./Service/axios.interceptor";
import Utils from "./Service/utils";
import NotFound from "./shared/not-found/not-found";
import Profile from "./Component/profile/profile";
initApiInterceptor();
function App() {
  return (
    <HashRouter>
      <Toast />
      <Listeners />
      <Switch>
        <Route exact path="/create-university" component={CreateUniversity} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Home} />
        <Route exact path="/verifyAdmin" component={verifyAdmin} />
        <Route exact path="/verifysuperadmin" component={verifyAdmin} />
        <Route exact path="/forgotpassword" component={ChangePassword} />
        <Route exact path="/changepassword" component={verifyAdmin} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </HashRouter>
  );
}

function Listeners() {
  let history = useHistory();
  useEffect(() => {
    Utils.Logout.subscribe(() => {
      localStorage.clear();
      history.push("/");
    });
  }, []);
  return null;
}

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token");
  return token ? (
    props.path == "/login" ? (
      <Redirect
        to={{
          pathname: "/dashboard",
        }}
      />
    ) : (
      <Route {...props} />
    )
  ) : (
    <Redirect
      to={{
        pathname: "/login",
      }}
    />
  );
};
export default App;
