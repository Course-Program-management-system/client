import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ListingPage from "../../../../../shared/listing-component/listing";

export default function ViewReport({ user }) {
  const history = useHistory();
  const { reportId, programId } = useParams();
  const [progress, setProgress] = useState(false);
  const [report, setReport] = useState(null);
  const [program, setProgram] = useState(null);

  useEffect(() => {
    const format = (message) => {
      message.marks = (message.marks || []).map((v) => {
        return { ...v, marks: v.marks.join(", ") };
      });
      message.courseOutcomes = message.courseOutcomes.map((v) => {
        return {
          ...v,
          improvementRequired: (v.improvementRequired && "Yes") || "No",
        };
      });
      return message;
    };
    const hasReport = localStorage.getItem("REPORT")
      ? JSON.parse(localStorage.getItem("REPORT"))
      : false;
    if (hasReport) {
      localStorage.removeItem("REPORT");
      return setReport(format(hasReport));
    }
    setProgress(true);
    getProgram();
    axios
      .get(`/report/${reportId}`)
      .then(({ data: { message } }) => {
        setProgress(false);
        setReport(format(message));
      })
      .catch(() => {
        //   history.push("/dashboard");
      });
  }, []);

  function getProgram() {
    axios.get(`program/${programId}`).then(({ data: { message } }) => {
      setProgram(message);
    });
  }
  return progress ? (
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
      {report?.marks && (
        <>
          <div className="w-4/5 m-auto text-xl mt-5">Marks</div>
          <ListingPage
            data={report.marks}
            // inProgress={inProgress}
            columnNames={[
              // { displayName: "Id", id: "id" },
              { displayName: "Name", id: "name" },
              { displayName: "marks", id: "marks" },
            ]}
          />
        </>
      )}
      {report?.programOutcomes && (
        <>
          <div className="w-4/5 m-auto text-xl mt-5">Program Outcomes</div>
          <ListingPage
            data={report.programOutcomes}
            // inProgress={inProgress}
            columnNames={[
              { displayName: "Program Outcome", id: "name" },
              { displayName: "Target", id: "attainment" },
            ]}
          />
        </>
      )}
      {report?.courseOutcomes && (
        <>
          <div className="w-4/5 m-auto text-xl mt-5">Course Outcomes</div>
          <ListingPage
            data={report.courseOutcomes}
            // inProgress={inProgress}
            columnNames={[
              { displayName: "Course Outcome", id: "name" },
              { displayName: "Target", id: "attainment" },
              { displayName: "Questions Attempted", id: "questionsAttempted" },
              { displayName: "Passed Target", id: "passedTarget" },
              {
                displayName: "Improvement Required",
                id: "improvementRequired",
              },
              { displayName: "Percentage", id: "percentage" },
            ]}
          />
        </>
      )}

      {program?.programOutcomes?.length > 0 && (
        <>
          <div className="w-4/5 m-auto text-xl mt-5">Program Outcomes</div>
          <ListingPage
            data={program.programOutcomes}
            columnNames={[
              { displayName: "Name", id: "name" },
              { displayName: "Description", id: "description" },
            ]}
          />
        </>
      )}

      {program?.programSpecificOutcomes?.length > 0 && (
        <>
          <div className="w-4/5 m-auto text-xl mt-5">
            Program Specific Outcomes
          </div>
          <ListingPage
            data={program.programSpecificOutcomes}
            columnNames={[
              { displayName: "Name", id: "name" },
              { displayName: "Description", id: "description" },
            ]}
          />
        </>
      )}
    </>
  );
}
