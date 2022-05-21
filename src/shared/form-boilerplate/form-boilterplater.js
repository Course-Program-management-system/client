import { Button, FormControl, FormGroup, makeStyles } from "@material-ui/core";
import React from "react";

export default function FormBoilerPlate({
  children,
  onCancel,
  onAdd,
  disabled,
  submitName,
}) {
  const useStyles = makeStyles({
    container: {
      width: "80%",
      padding: "1.5rem",

      boxShadow: "0 1rem 2rem rgba(0, 0, 0, 0.2)",
      margin: "4rem auto",
      "& > *": {
        marginTop: 20,
      },
    },
  });
  const classes = useStyles();
  return (
    <FormGroup className={classes.container}>
      {children}
      <FormControl>
        <div className="row">
          <div className="col-2 justify-content-center">
            <Button
              disabled={disabled}
              variant="contained"
              color="primary"
              onClick={onAdd}
              Style="background-color:green"
            >
              {submitName || "Submit"}
            </Button>
          </div>
          <div className="col-2">
            <Button
              disabled={disabled}
              variant="contained"
              color="primary"
              onClick={onCancel}
              Style="background-color:red"
            >
              Cancel
            </Button>
          </div>
        </div>
      </FormControl>
    </FormGroup>
  );
}
