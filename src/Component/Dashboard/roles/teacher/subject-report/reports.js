import { Button, CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import UseListingInProgress from "../../../../../Service/useListingInProgress";
import ListingPage from "../../../../../shared/listing-component/listing";
export default function Report({ user }) {
  const { subjectId, programId, examTypeId } = useParams();
  const [reports, setreports] = useState(null);
  const [cummulative, setCummulative] = useState([]);
  const [inProgress, addInProgress, removeInProgress] = UseListingInProgress();
  useEffect(getAllreports, []);
  function getAllreports() {
    axios
      .get(`/subject/${subjectId}/${examTypeId || "-"}/report`)
      .then(({ data: { message } }) => {
        setreports(
          message.map((v) => {
            return { ...v, createdAt: new Date(v.createdAt).toDateString() };
          })
        );
      })
      .catch(() => {
        setreports([]);
      });
  }
  function deleteReport({ _id }) {
    addInProgress(_id);
    axios
      .delete(`/report/${_id}`)
      .then(({ data: { message } }) => {
        getAllreports();
        removeInProgress(_id);
      })
      .catch(() => {
        removeInProgress(_id);
      });
  }
  function getLink({ _id }, type) {
    // if (type === "edit") return `/dashboard/update-subject/${data._id}`;
    if (type === "view")
      return (
        (examTypeId &&
          `/dashboard/programs/program-subjects/${programId}/view-subject/${subjectId}/view-examtype/${examTypeId}/view-report/${_id}`) ||
        `/dashboard/programs/program-subjects/${programId}/course-report/${subjectId}/view-report/${_id}`
      );
  }
  function download({ _id }) {
    fetch(`http://localhost:8080/v1/attainment/exportreport/${_id}`)
      .then((v) => v.blob())
      .then((v) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(v);
        a.download = `Report-${new Date().toLocaleDateString()}.xlsx`;
        a.target = "_blank";
        a.click();
      });
  }

  function onCheckChange(check) {
    setCummulative(Object.keys(check || {}));
  }

  return !reports ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10rem",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <>
      <div className="w-4/5 m-auto text-left mt-4 text-2xl flex gap-2 flex-col">
        <p>Reports</p>
        <div className="flex flex-col w-50 gap-2">
          {(!examTypeId && (
            <CumulativeReport
              reportIds={cummulative}
              subjectId={subjectId}
              programId={programId}
            />
          )) || (
            <Button
              style={{ textTransform: "none" }}
              color={"primary"}
              variant="contained"
              component={Link}
              to={`/dashboard/programs/program-subjects/${programId}/view-subject/${subjectId}/view-examtype/${examTypeId}/generate-report`}
            >
              Generate Report
            </Button>
          )}
        </div>
      </div>
      <ListingPage
        checkbox={true}
        data={reports}
        inProgress={inProgress}
        checkChange={onCheckChange}
        columnNames={[
          // { displayName: "Id", id: "_id" },
          { displayName: "Name", id: "name" },
          { displayName: "Section", id: "section" },
          { displayName: "Date", id: "createdAt" },
        ]}
        actions={[
          { displayName: "View", getLink, color: "primary", type: "view" },
          { displayName: "Download", onClick: download, color: "primary" },
          {
            displayName: "Delete",
            onClick: deleteReport,
            color: "secondary",
          },
        ]}
      />
    </>
  );
}

function CumulativeReport({ subjectId, programId, reportIds }) {
  const history = useHistory();
  const [name, setName] = useState("");
  function generateCummulativeReport() {
    axios
      .post(`/subject/${subjectId}/generate-cumulative`, {
        reportIds,
        name,
      })
      .then(({ data: { message } }) => {
        history.push(
          `/dashboard/programs/program-subjects/${programId}/course-report/${subjectId}/view-report/${message._id}`,
          message
        );
      });
  }
  return (
    <div className="flex gap-2 align-center">
      <input
        multiple={false}
        type="text"
        className="flex-1 form-control form-control-sm w-25"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Cumulative Report Name"
        disabled={reportIds.length === 0}
      />
      <Button
        style={{ textTransform: "none" }}
        variant="contained"
        disabled={reportIds.length === 0 || name.length === 0}
        onClick={generateCummulativeReport}
      >
        Generate Cummulative
      </Button>
    </div>
  );
}
