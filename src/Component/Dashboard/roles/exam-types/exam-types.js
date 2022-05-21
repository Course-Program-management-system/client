import { Button } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CrudListingView from "../../../../shared/crud/crud";
import SubjectReport from "../teacher/subject-report";
import Report from "../teacher/subject-report/reports";
import ViewReport from "../teacher/subject-report/view-report";
import ExamTypeForm from "./exam-type-form";
// import ExamTypeForm from "./exam-type-form";
export default function ExamTypes({ user }) {
  const history = useHistory();
  const PREFIX_ROUTE =
    "/dashboard/programs/program-subjects/:programId/view-subject/:subjectId";
  return (
    <>
      <Switch>
        {/* REPORT */}
        <Route
          exact
          path={`${PREFIX_ROUTE}/view-examtype/:examTypeId`}
          render={() => <Report user={user} />}
        />
        <Route
          exact
          path={`${PREFIX_ROUTE}/view-examtype/:examTypeId/view-report/:reportId`}
          render={() => <ViewReport user={user} />}
        />
        <Route
          exact
          path={`${PREFIX_ROUTE}/view-examtype/:examTypeId/generate-report`}
          render={() => <SubjectReport user={user} />}
        />
        {/* REPORT */}
        <Route
          exact
          path={`${PREFIX_ROUTE}/update-examtype/:examTypeId`}
          render={() => <ExamTypeForm user={user} />}
        />
        <Route
          exact
          path={`${PREFIX_ROUTE}/create-examtype`}
          render={() => <ExamTypeForm user={user} />}
        />
        <Route
          exact
          path={`${PREFIX_ROUTE}`}
          render={() => {
            return (
              <>
                <div className="w-4/5 m-auto">
                  <Button
                    className="mt-3 mb-3"
                    color={"primary"}
                    variant="contained"
                    component={Link}
                    to={`${history.location.pathname}/create-examtype`}
                  >
                    Create
                  </Button>
                </div>
                <CrudListingView
                  user={user}
                  columnNames={[
                    { displayName: "name", id: "name" },
                    { displayName: "Target", id: "target" },
                  ]}
                  getUrl="subject/:subjectId/examtype"
                  pageName="Exam Types"
                  links={{
                    edit: {
                      displayName: "Edit",
                      color: "primary",
                      type: "edit",
                      url: `${PREFIX_ROUTE}/update-examtype/:id`,
                      getLink: true,
                    },
                    delete: {
                      displayName: "Delete",
                      color: "secondary",
                      type: "delete",
                      url: "/subject/:subjectId/examtype/:id",
                    },
                    view: {
                      displayName: "View",
                      color: "primary",
                      type: "view",
                      url: `${PREFIX_ROUTE}/view-examtype/:id`,
                      getLink: true,
                    },
                  }}
                />
              </>
            );
          }}
        />
      </Switch>
    </>
  );
}
