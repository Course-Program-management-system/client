import { Redirect, Route, Switch } from "react-router-dom";
import CreateProgram from "./create-program";
import CrudListingView from "../../../../shared/crud/crud";
import RegisterAdmin from "../send-email/send-email";

export default function Director({ user }) {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/dashboard/departments/department-programs/:departmentId/create-teacher/:programId"
          render={() => (
            <RegisterAdmin heading={"Create Professor"} param="program" />
          )}
        />
        <Route
          exact
          path="/dashboard/departments/create-program/:departmentId"
          render={() => <CreateProgram user={user} />}
        />
        <Route
          exact
          path="/dashboard/programs/update-program/:programId"
          render={() => <CreateProgram user={user} />}
        />
        <Route
          exact
          path="/dashboard/departments/department-programs/:departmentId/program-teachers/:programId"
          render={() => (
            <CrudListingView
              user={user}
              pageName="Professors"
              columnNames={[
                // { displayName: "Id", id: "_id" },
                { displayName: "Name", id: "name" },
                { displayName: "Email", id: "email" },
              ]}
              getUrl="/program/:programId/user"
              links={{
                delete: {
                  displayName: "Delete",
                  color: "secondary",
                  type: "delete",
                  url: "/program/:programId/user/:id",
                },
              }}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/departments"
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
                view: {
                  displayName: "Programs",
                  color: "primary",
                  type: "view",
                  url: "/dashboard/departments/department-programs/:id",
                  getLink: true,
                },
                createProgram: {
                  displayName: "Create Program",
                  color: "primary",
                  type: "createProgram",
                  url: "/dashboard/departments/create-program/:id",
                  getLink: true,
                },
              }}
            />
          )}
        />
        <Route
          exact
          path="/dashboard/departments/department-programs/:departmentId"
          render={() => {
            return (
              <CrudListingView
                pageName="Programs"
                user={user}
                columnNames={[
                  // { displayName: "Id", id: "_id" },
                  { displayName: "Program Name", id: "name" },
                ]}
                getUrl="department/:departmentId/program"
                links={{
                  edit: {
                    displayName: "Edit",
                    color: "primary",
                    type: "edit",
                    url: "/dashboard/programs/update-program/:id",
                    getLink: true,
                  },
                  delete: {
                    displayName: "Delete",
                    color: "secondary",
                    type: "delete",
                    url: "/program/:id",
                  },
                  showTeachers: {
                    displayName: "Show Professors",
                    color: "primary",
                    type: "showTeachers",
                    url: "/dashboard/departments/department-programs/:departmentId/program-teachers/:id",
                    getLink: true,
                  },
                  addTeacher: {
                    displayName: "Add Professor",
                    color: "primary",
                    type: "addTeacher",
                    url: "/dashboard/departments/department-programs/:departmentId/create-teacher/:id",
                    getLink: true,
                  },
                }}
              />
            );
          }}
        />
        <Route exact path="/dashboard">
          <Redirect to="/dashboard/departments" />
        </Route>
      </Switch>
    </>
  );
}
