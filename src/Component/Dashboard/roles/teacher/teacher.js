import { Button } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CrudListingView from "../../../../shared/crud/crud";
import ExamTypes from "../exam-types/exam-types";
import RegisterAdmin from "../send-email/send-email";
import CreateSubject from "./create-subject";
import Report from "./subject-report/reports";
import ViewReport from "./subject-report/view-report";
export default function Teacher({ user }) {
  const history = useHistory();
  const PREFIX_URL = "/dashboard/programs/program-subjects";
  return (
    <>
      <ExamTypes user={user} />
      <Switch>
        {/* REPORT */}
        <Route
          exact
          path={`${PREFIX_URL}/:programId/course-report/:subjectId`}
          render={() => <Report user={user} />}
        />
        <Route
          exact
          path={`${PREFIX_URL}/:programId/course-report/:subjectId/view-report/:reportId`}
          render={() => <ViewReport user={user} />}
        />
        {/* REPORT */}
        <Route
          exact
          path={`${PREFIX_URL}/:programId/subject-teachers/:subjectId`}
          render={() => (
            <CrudListingView
              user={user}
              columnNames={[
                // { displayName: "Id", id: "_id" },
                { displayName: "Name", id: "name" },
                { displayName: "Email", id: "email" },
              ]}
              getUrl="/subject/:subjectId/user"
              pageName="Professors"
              links={{
                delete: {
                  displayName: "Delete",
                  color: "secondary",
                  type: "delete",
                  url: "/subject/:subjectId/user/:id",
                },
              }}
            />
          )}
        />
        <Route
          exact
          path={`${PREFIX_URL}/:programId/create-teacher/:subjectId`}
          render={() => (
            <RegisterAdmin heading={"Create Professor"} param="subject" />
          )}
        />
        <Route
          exact
          path={`${PREFIX_URL}/:programId/create-course`}
          render={() => <CreateSubject user={user} />}
        />
        <Route
          exact
          path={`${PREFIX_URL}/:programId/update-subject/:subjectId`}
          render={() => <CreateSubject user={user} />}
        />

        <Route
          exact
          path="/dashboard/programs"
          render={() => (
            <CrudListingView
              pageName="Programs"
              user={user}
              columnNames={[
                // { displayName: "Id", id: "_id" },
                { displayName: "Program Name", id: "name" },
              ]}
              getUrl="program"
              links={{
                view: {
                  displayName: "View Courses",
                  color: "primary",
                  type: "view",
                  url: `${PREFIX_URL}/:id`,
                  getLink: true,
                },
              }}
            />
          )}
        />

        <Route
          exact
          path={`${PREFIX_URL}/:programId`}
          render={() => {
            return (
              <>
                <div className="w-4/5 m-auto">
                  <Button
                    className="mt-3 mb-3"
                    color={"primary"}
                    variant="contained"
                    component={Link}
                    to={`${history.location.pathname}/create-course`}
                  >
                    Create
                  </Button>
                </div>
                <CrudListingView
                  user={user}
                  columnNames={[
                    // { displayName: "Id", id: "_id" },
                    { displayName: "Course Name", id: "name" },
                    { displayName: "Code", id: "code" },
                  ]}
                  getUrl="program/:programId/subject"
                  pageName="Courses"
                  links={{
                    edit: {
                      displayName: "Edit",
                      color: "primary",
                      type: "edit",
                      url: `${PREFIX_URL}/:programId/update-subject/:id`,
                      getLink: true,
                    },
                    delete: {
                      displayName: "Delete",
                      color: "secondary",
                      type: "delete",
                      url: "/subject/:id",
                    },
                    examType: {
                      displayName: "Exam Types",
                      color: "primary",
                      type: "examType",
                      url: `${PREFIX_URL}/:programId/view-subject/:id`,
                      getLink: true,
                    },
                    addTeacher: {
                      displayName: "Add Professor",
                      color: "primary",
                      type: "addTeacher",
                      url: `${PREFIX_URL}/:programId/create-teacher/:id`,
                      getLink: true,
                    },
                    showTeachers: {
                      displayName: "Show Professors",
                      color: "primary",
                      type: "showTeachers",
                      url: `${PREFIX_URL}/:programId/subject-teachers/:id`,
                      getLink: true,
                    },
                    generateReport: {
                      displayName: "Report",
                      color: "primary",
                      type: "generateReport",
                      url: `${PREFIX_URL}/:programId/course-report/:id`,
                      getLink: true,
                    },
                  }}
                />
              </>
            );
          }}
        />
        <Route exact path="/dashboard">
          <Redirect to="/dashboard/programs" />
        </Route>
      </Switch>
    </>
  );
}
