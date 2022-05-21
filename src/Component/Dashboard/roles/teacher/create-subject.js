import { FormControl, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../../../Service/api";
import Utils from "../../../../Service/utils";
import FormBoilerPlate from "../../../../shared/form-boilerplate/form-boilterplater";
import "./teacher.css";
export default function CreateSubject({ user }) {
  const history = useHistory();
  const { subjectId, programId } = useParams();
  const [form, setForm] = useState({
    name: ``,
    // attainment: "",
    // teacher: "",
    // studentsCount: "",
    // section: "",
  });
  const [sections, setSections] = useState([]);
  const [progress, setProgress] = useState(false);

  function createSubject() {
    setProgress(true);
    const sections = getParsedSections();
    if (sections) {
      form["sections"] = sections;
    }
    // form.attainment = Number(form.attainment);
    const api = subjectId
      ? Api.updateSubject(subjectId, form)
      : Api.createSubject(programId, form);
    api
      .then(({ data: { message } }) => {
        history.goBack();
        Utils.Toast.next(
          `Subject ${(subjectId && "updated") || "created"} successfully`
        );
      })
      .catch(() => {
        setProgress(false);
      });
  }
  function setValue(key, state) {
    return ({ target: { value } }) => {
      const k = { [key]: value };
      state?.({ ...form, ...k });
    };
  }
  function updateSections(key, index) {
    return ({ target: { value } }) => {
      const k = { [key]: value };
      const clone = [...sections];
      clone[index] = { ...clone[index], ...k };
      setSections(clone);
    };
  }
  function addQuestion() {
    const clone = [...sections];
    clone.push({});
    setSections(clone);
  }
  function removeSection(index) {
    const clone = [...sections];
    clone.splice(index, 1);
    setSections(clone);
  }
  function preFillSections({ sections }) {
    if (!sections || sections?.length === 0) return;
    const newSections = [];
    sections.forEach(({ questions }, section) => {
      questions.forEach(({ co, part, maxMarks, outOf }) => {
        newSections.push({
          section: section + 1,
          part,
          maxMarks,
          co: co?.join(",") || co,
          // outOf,
        });
      });
    });
    setSections(newSections);
  }
  function getParsedSections() {
    const obj = {};
    sections.forEach(({ section, co, part, maxMarks }) => {
      const coSplit = co?.split(",").map((v) => Number(v));
      if (obj[section]) {
        obj[section] = !obj[section]
          ? [
              {
                co: coSplit,
                part: Number(part),
                maxMarks: Number(maxMarks),
              },
            ]
          : [
              ...obj[section],
              {
                co: coSplit,
                part: Number(part),
                maxMarks: Number(maxMarks),
              },
            ];
      } else {
        obj[section] = [
          {
            co: coSplit,
            part: Number(part),
            maxMarks: Number(maxMarks),
          },
        ];
      }
    });
    const newSections = [];
    for (let k in obj)
      newSections.push({
        questions: obj[k].sort((a, b) =>
          a.part > b.part ? 1 : b.part > a.part ? -1 : 0
        ),
      });
    if (newSections.length === 0) return null;
    return newSections;
  }
  function addNewQuestionSectionPart(type) {
    const latestSection = sections.slice(-1)[0];
    const clone = [...sections];
    if (!latestSection) {
      return setSections([{ section: 1, part: 1, maxMarks: "", co: "" }]);
    }
    const { section, part, maxMarks, co } = latestSection;
    if (type === "section") {
      clone.push({ part, maxMarks, co, section: section + 1 });
    } else if (type === "part") {
      clone.push({ part: part + 1, maxMarks, co, section: section });
    } else {
      clone.push({ part, maxMarks, co, section: section });
    }
    setSections(clone);
  }
  useEffect(() => {
    if (subjectId) {
      setProgress(true);
      axios
        .get(`/subject/${subjectId}`)
        .then(
          ({
            data: {
              message: { name, attainment, code, examType, sections, semester },
            },
          }) => {
            setProgress(false);
            setForm({
              name,
              attainment,
              code,
              examType,
              sections,
              semester,
            });
            preFillSections({ sections });
          }
        )
        .catch(() => {
          history.push("/dashboard");
        });
    }
  }, []);
  return (
    <FormBoilerPlate
      onCancel={history.goBack}
      onAdd={createSubject}
      submitName={(subjectId && "Update") || "Create"}
      disabled={progress}
    >
      <FormControl>
        <TextField
          variant="standard"
          label="Course Name"
          value={form.name}
          onChange={setValue("name", setForm)}
        />
        {/* <TextField
          variant="standard"
          label="Target"
          value={form.attainment || ""}
          onChange={setValue("attainment", setForm)}
        /> */}
        <TextField
          variant="standard"
          label="Course Code"
          type="number"
          value={form.code || ""}
          onChange={setValue("code", setForm)}
        />
        {/* <TextField
          variant="standard"
          label="Exam Type"
          value={form.examType || ""}
          onChange={setValue("examType", setForm)}
        />
        <TextField
          variant="standard"
          label="Semester"
          type="number"
          value={form.semester || ""}
          onChange={setValue("semester", setForm)}
        /> */}
        {/* <div className="mt-3">Sections</div>
        <div className="subject-sections">
          {sections.map(({ co, maxMarks, section, part, outOf }, index) => {
            return (
              <div className="section-data">
                <TextField
                  variant="standard"
                  label="Section"
                  className="flex-1"
                  value={section}
                  onChange={updateSections("section", index)}
                />
                <TextField
                  variant="standard"
                  label="Part"
                  className="flex-1"
                  value={part}
                  onChange={updateSections("part", index)}
                />
                <TextField
                  variant="standard"
                  label="CO"
                  className="flex-1"
                  value={co}
                  onChange={updateSections("co", index)}
                />
                <TextField
                  variant="standard"
                  label="Max Marks"
                  className="flex-1"
                  value={maxMarks}
                  onChange={updateSections("maxMarks", index)}
                />
                <button
                  className="section-data-remove"
                  onClick={() => removeSection(index)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div> */}
        {/* <div className="question-btn">
          <button
            onClick={() => addNewQuestionSectionPart("section")}
            className="add-question"
          >
            New Section
          </button>
          <button
            onClick={() => addNewQuestionSectionPart("part")}
            className="add-question"
          >
            New Part
          </button>
          <button
            onClick={() => addNewQuestionSectionPart("question")}
            className="add-question"
          >
            New Question
          </button>
        </div> */}
      </FormControl>
    </FormBoilerPlate>
  );
}
