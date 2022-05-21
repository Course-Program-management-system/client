import { FormControl, Input, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../../../Service/api";
import Utils from "../../../../Service/utils";
import FormBoilerPlate from "../../../../shared/form-boilerplate/form-boilterplater";

export default function CreateProgram({ user }) {
  const history = useHistory();
  const { programId, departmentId } = useParams();
  const [form, setForm] = useState({ name: `` });
  const [progress, setProgress] = useState(false);
  const [programOutcome, setProgramOutcome] = useState([
    // { name: "", description: "" },
  ]);
  const [programSpecificOutcome, setProgramSpecificOutcome] = useState([
    // { name: "", description: "" },
  ]);

  const getPoPsoData = (func) => [
    ...((func == setProgramOutcome && programOutcome) ||
      programSpecificOutcome),
  ];
  const handlePoPsoChange = (func, index) => {
    return ({ target }) => {
      let data = getPoPsoData(func);
      data[index][target.name] = target.value;
      func(data);
    };
  };
  const addPoPso = (func) => {
    func([...getPoPsoData(func), { name: "", description: "" }]);
  };
  const removePoPso = (func, index) => {
    let data = getPoPsoData(func);
    data.splice(index, 1);
    func(data);
  };

  function createDepartment() {
    setProgress(true);
    const poPso = {};
    if (programOutcome.length > 0) poPso["programOutcomes"] = programOutcome;
    if (programSpecificOutcome.length > 0)
      poPso["programSpecificOutcomes"] = programSpecificOutcome;
    const payload = { ...form, ...poPso };
    const api = programId
      ? Api.UpdateProgram(programId, payload)
      : Api.createProgram(departmentId, payload);
    api
      .then(({ data: { message } }) => {
        history.goBack();
        Utils.Toast.next(
          `Program ${(programId && "updated") || "created"} successfully`
        );
      })
      .catch(() => {
        setProgress(false);
      });
  }
  useEffect(() => {
    if (programId) {
      setProgress(true);
      axios
        .get(`/program/${programId}`)
        .then(({ data: { message } }) => {
          setProgress(false);
          setForm({ name: message.name });
          message.programOutcomes && setProgramOutcome(message.programOutcomes);
          message.programSpecificOutcomes &&
            setProgramSpecificOutcome(message.programSpecificOutcomes);
        })
        .catch(() => {
          history.push("/dashboard/director");
        });
    }
  }, []);
  return (
    <>
      <FormBoilerPlate
        onCancel={history.goBack}
        onAdd={createDepartment}
        submitName={(programId && "Update") || "Create"}
        disabled={progress}
      >
        <FormControl>
          <InputLabel htmlFor="my-input">Program Name</InputLabel>
          <Input
            name="name"
            id="my-input"
            className="mb-3"
            value={form.name}
            onChange={({ target: { value } }) => {
              setForm({ name: value });
            }}
          />
        </FormControl>
        <GetOutcomes
          outcomes={programOutcome}
          handlePoPsoChange={handlePoPsoChange}
          operation={setProgramOutcome}
          removePoPso={removePoPso}
          label="Enter PO"
        />
        <div className="row">
          <div className="col-12">
            <button
              className="btn btn-success mt-5 mb-5"
              onClick={() => addPoPso(setProgramOutcome)}
            >
              Add PO
            </button>
          </div>
          <div className="col-12">
            <GetOutcomes
              outcomes={programSpecificOutcome}
              handlePoPsoChange={handlePoPsoChange}
              operation={setProgramSpecificOutcome}
              removePoPso={removePoPso}
              label="Enter PSO"
            />
            <button
              className="btn btn-success mt-5 mb-5"
              onClick={() => addPoPso(setProgramSpecificOutcome)}
            >
              Add PSO
            </button>
          </div>
        </div>
      </FormBoilerPlate>
    </>
  );
}

function GetOutcomes({
  outcomes,
  handlePoPsoChange,
  operation,
  removePoPso,
  label = "Enter PS",
}) {
  return outcomes.map((form, index) => {
    return (
      <div className="row" Style="margin-top:2%" key={index}>
        <div className="col-2">
          <FormControl>
            <TextField
              label={label}
              variant="standard"
              type="number"
              name="name"
              onChange={handlePoPsoChange(operation, index)}
              value={form.name}
            />
          </FormControl>
        </div>
        <div className="col-8">
          <TextField
            id="fullWidth"
            fullWidth
            label="Description"
            variant="standard"
            name="description"
            placeholder="description"
            onChange={handlePoPsoChange(operation, index)}
            value={form.description}
            multiline
          />
        </div>
        <div className="col-2">
          <FormControl>
            <button
              className="mt-2 btn btn-danger"
              onClick={() => removePoPso(operation, index)}
            >
              Remove
            </button>
          </FormControl>
        </div>
      </div>
    );
  });
}
