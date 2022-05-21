import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import CrudListingView from "../../../../shared/crud/crud";
import RegisterAdmin from "../send-email/send-email";
import CreateDepartment from "./create-department";
export default function University({ user }) {
  const useStyles = makeStyles({
    component: {
      margin: 50,
      "& > *": {
        marginTop: 50,
      },
    },
    tabs: {
      color: "white !important",
      marginLeft: "10px",
      textDecoration: "none",
      border: "1px solid white",
      padding: "5px",
    },
  });
  const classes = useStyles();
  return (
    <>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <NavLink
            to="/dashboard/department/create"
            className={classes.tabs}
            exact
          >
            Create Department
          </NavLink>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route
          exact
          path="/dashboard/department/create-director/:departmentId"
          render={() => (
            <RegisterAdmin heading={"Create Director"} param="department" />
          )}
        />
        <Route
          exact
          path="/dashboard/department/create"
          render={() => <CreateDepartment user={user} />}
        />
        <Route
          exact
          path="/dashboard/department/:departmentId"
          render={() => <CreateDepartment user={user} />}
        />
        <Route
          exact
          path="/dashboard/department/department-directors/:departmentId"
          render={() => (
            <CrudListingView
              user={user}
              pageName="Directors"
              columnNames={[
                // { displayName: "Id", id: "_id" },
                { displayName: "Name", id: "name" },
                { displayName: "Email", id: "email" },
              ]}
              getUrl="/department/:departmentId/user"
              links={{
                delete: {
                  displayName: "Delete",
                  color: "secondary",
                  type: "delete",
                  url: "/department/:departmentId/user/:id",
                },
              }}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/department"
          render={() => (
            <CrudListingView
              pageName="Schools"
              user={user}
              columnNames={[
                // { displayName: "Id", id: "_id" },
                { displayName: "School Name", id: "name" },
              ]}
              getUrl="department"
              links={{
                edit: {
                  displayName: "Edit",
                  color: "primary",
                  type: "edit",
                  url: "/dashboard/department/:id",
                  getLink: true,
                },
                delete: {
                  displayName: "Delete",
                  color: "secondary",
                  type: "delete",
                  url: "/department/:id",
                },
                addDirector: {
                  displayName: "Add Director",
                  color: "primary",
                  type: "addDirector",
                  url: "/dashboard/department/create-director/:id",
                  getLink: true,
                },
                showDirectors: {
                  displayName: "Show Directors",
                  color: "primary",
                  type: "showDirectors",
                  url: "/dashboard/department/department-directors/:id",
                  getLink: true,
                },
              }}
            />
          )}
        />{" "}
        <Route exact path="/dashboard">
          <Redirect to="/dashboard/department" />
        </Route>
        {/* <Route component={NotFound} /> */}
      </Switch>
    </>
  );
}
