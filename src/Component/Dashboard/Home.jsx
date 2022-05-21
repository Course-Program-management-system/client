import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Api from "../../Service/api";
import Breadcrumb from "../../shared/breadcrumb";
import NavBar from "../Nav";
import Profile from "../profile/profile";
import Director from "./roles/director/director";
import Teacher from "./roles/teacher/teacher";
import University from "./roles/university/university";

const Home = () => {
  const [user, setUser] = useState(null);
  const [permission, setPermission] = useState(null);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const existingPermission = localStorage.getItem("PERMISSION");
    Api.getProfile().then(({ data: { message } }) => {
      setUser(message);
      setPermission(
        existingPermission ||
          (typeof message.permission === "object" && message.permission[0]) ||
          message.permission
      );
      if (location.pathname !== "/dashboard") return;
      history.push("/dashboard");
    });
  }, []);

  const permissionChange = (p) => {
    history.push("/dashboard");
    localStorage.setItem("PERMISSION", p);
    setPermission(p);
  };
  return (
    <div className="pb-1">
      <NavBar
        user={user}
        onPermissionChange={permissionChange}
        permission={permission}
      />
      <Breadcrumb />
      <Switch>
        <Route path="/dashboard/profile" component={Profile} />
        {permission === "DIRECTOR" && (
          <Route path="/dashboard" render={() => <Director user={user} />} />
        )}
        {permission === "UNIVERSITY" && (
          <Route path="/dashboard" render={() => <University user={user} />} />
        )}
        {permission === "TEACHER" && (
          <Route path="/dashboard" render={() => <Teacher user={user} />} />
        )}
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
};

export default Home;
