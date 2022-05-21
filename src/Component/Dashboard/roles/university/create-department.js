import { FormControl, Input, InputLabel } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Api from "../../../../Service/api";
import Utils from "../../../../Service/utils";
import FormBoilerPlate from "../../../../shared/form-boilerplate/form-boilterplater";

export default function CreateDepartment({ user }) {
  const history = useHistory();
  const { departmentId } = useParams();
  const [form, setForm] = useState({ name: `` });
  const [progress, setProgress] = useState(false);

  function createDepartment() {
    setProgress(true);
    const api = departmentId
      ? Api.updateDepartment(departmentId, form)
      : Api.createDepartment(form);
    api
      .then(({ data: { message } }) => {
        history.goBack();
        Utils.Toast.next(
          `Department ${(departmentId && "updated") || "created"} successfully`
        );
      })
      .catch(() => {
        setProgress(false);
      });
  }
  useEffect(() => {
    if (departmentId) {
      setProgress(true);
      axios
        .get(`/department/${departmentId}`)
        .then(({ data: { message } }) => {
          setProgress(false);
          setForm({ name: message.name });
        })
        .catch(() => {
          history.push("/dashboard/university");
        });
    }
  }, []);
  return (
    <FormBoilerPlate
      onCancel={history.goBack}
      onAdd={createDepartment}
      submitName={(departmentId && "Update") || "Create"}
      disabled={progress}>
      <FormControl>
        <InputLabel htmlFor="my-input">Department Name</InputLabel>
        <Input
          name="name"
          id="my-input"
          value={form.name}
          onChange={({ target: { value } }) => {
            setForm({ name: value });
          }}
        />
      </FormControl>
    </FormBoilerPlate>
  );
}
