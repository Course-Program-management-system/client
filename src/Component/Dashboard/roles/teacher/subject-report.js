import { FormControl } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Graph from "../../../../shared/graph/graph";
import Utils from "../../../../Service/utils";
import FormBoilerPlate from "../../../../shared/form-boilerplate/form-boilterplater";
import ListingPage from "../../../../shared/listing-component/listing";

export default function SubjectReport({ user }) {
  const history = useHistory();
  const { subjectId, examTypeId } = useParams();
  const [form, setForm] = useState({});
  const [progress, setProgress] = useState(false);
  const [report, setReport] = useState({});

  function createSubject() {
    if (!form.copo || !form.marks) return;
    const formData = new FormData();
    formData.append("copo", form.copo);
    formData.append("marks", form.marks);
    formData.append("name", form.name);
    if (form.section) {
      formData.append("section", form.section);
    }
    axios
      .post(`subject/${subjectId}/${examTypeId}/calculate`, formData)
      .then(({ data: { message } }) => {
        Utils.Toast.next("Reported generated successfully");
        generateReport(message);
      })
      .catch(() => {
        setProgress(false);
      });
  }
  function setValue(key, isInput) {
    return ({ target: { files, value } }) => {
      const k = { [key]: (isInput && value) || Object.values(files)[0] };
      setForm({ ...form, ...k });
    };
  }
  useEffect(() => {
    // if (subjectId) {
    //   setProgress(true);
    //   axios
    //     .get(`/subject/${subjectId}`)
    //     .then(() => {
    //       setProgress(false);
    //     })
    //     .catch(() => {
    //       history.push("/dashboard");
    //     });
    // }
  }, []);
  function generateReport({ attainment, courseOutcome }) {
    const parsedAttainment = [];
    const parsedCourseOutcomes = [];
    for (let key in attainment) {
      parsedAttainment.push({
        name: key,
        percentage: Number(attainment[key]).toFixed(2),
      });
    }
    for (let key in courseOutcome) {
      parsedCourseOutcomes.push({
        name: `${key}`,
        attainment: Number(courseOutcome[key]?.attainment).toFixed(2),
        questionsAttempted: courseOutcome[key]?.attempted,
        passedTarget: courseOutcome[key]?.passedTarget,
        improvementRequired:
          (courseOutcome[key]?.improvementRequired && "Yes") || "No",
        percentage: Number(courseOutcome[key]?.percentage).toFixed(2),
      });
    }
    setReport({ parsedCourseOutcomes, parsedAttainment });
  }
  return (
    <>
      <FormBoilerPlate
        onCancel={history.goBack}
        onAdd={createSubject}
        submitName={"Generate"}
        disabled={progress}
      >
        <FormControl>
          <div className="flex mb-3 gap-3">
            <p>Report Name</p>
            <input
              multiple={false}
              type="text"
              required
              className="flex-1 form-control form-control-sm w-25 mb-3"
              onChange={setValue("name", true)}
              value={form.name}
              placeholder="Report Name"
            />
          </div>
          <div className="flex mb-3 gap-3">
            <p>Section Name</p>
            <input
              multiple={false}
              type="text"
              required
              className="flex-1 form-control form-control-sm w-25 mb-3"
              onChange={setValue("section", true)}
              value={form.section}
              placeholder="Section Name"
            />
          </div>
          <div className="flex mb-3 gap-3">
            <p>COPO matrix</p>
            <input
              multiple={false}
              type="file"
              className="flex-1 form-control form-control-sm w-25 mb-3"
              onChange={setValue("copo")}
            />
          </div>
          <div className="flex mb-3 gap-3">
            <p>Students Marksheet</p>
            <input
              multiple={false}
              type="file"
              className="flex-1 form-control form-control-sm w-25  mb-3"
              onChange={setValue("marks")}
            />
          </div>
        </FormControl>
      </FormBoilerPlate>
      {report?.parsedCourseOutcomes && (
        <h3 className="mt-3 container text-center"> Course Outcome </h3>
      )}

      {report?.parsedCourseOutcomes && (
        <ListingPage
          data={report.parsedCourseOutcomes}
          // inProgress={inProgress}
          columnNames={[
            { displayName: "Course Outcome", id: "name" },
            { displayName: "Target", id: "attainment" },
            { displayName: "Questions Attempted", id: "questionsAttempted" },
            { displayName: "Passed Target", id: "passedTarget" },
            { displayName: "Improvement Required", id: "improvementRequired" },
            { displayName: "Percentage", id: "percentage" },
          ]}
        />
      )}
      {report?.parsedCourseOutcomes && (
        <Graph data={report?.parsedCourseOutcomes} />
      )}
      {report?.parsedCourseOutcomes && (
        <h3 className="mt-3 container text-center"> Program Outcome</h3>
      )}
      {report?.parsedAttainment && (
        <ListingPage
          data={report.parsedAttainment}
          // inProgress={inProgress}
          columnNames={[
            { displayName: "Program Outcome", id: "name" },
            { displayName: "Target", id: "percentage" },
          ]}
        />
      )}
      {report?.parsedAttainment && <Graph data={report?.parsedAttainment} />}
    </>
  );
}
