import React from "react";
import Paper from "@material-ui/core/Paper";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./AddColumn.css";
import { HOST } from "../../constants/constants";
import { Context } from "../../App";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddColumn() {
  const types = ["Integer", "Double", "String", "Array", "Boolean"];
  const arraytypes = ["Integer", "Double", "String", "Boolean"];
  const classes = useStyles();
  const [col, setCol] = React.useState("");
  const [type, setType] = React.useState("");
  const [defaultValue, setDefaultValue] = React.useState("");
  const [arrayType, setArrayType] = React.useState("");
  const [appear, setAppear] = React.useState(false);
  const store = React.useContext(Context);

  const handleChange = (event) => {
    setType(event.target.value);
    if (event.target.value === "Array") setAppear(true);
    else setAppear(false);
  };

  const typeConverter = (value) => {
    if (type === "Integer") return parseInt(value);
    else if (type === "Double") return parseFloat(value);
    else if (type === "Boolean") {
      if (value.toLowerCase() === "false") return false;
      else if (value.toLowerCase() === "true") return true;
      else return "not a boolean";
    } else if (type === "Array") {
      if (arrayType === "Integer")
        return value.split(",").map((e) => parseInt(e));
      else if (arrayType === "Double")
        return value.split(",").map((e) => parseFloat(e));
      else if (arrayType === "Boolean") {
        if (value.toLowerCase() === "false")
          return value.split(",").map((e) => false);
        else if (value.toLowerCase() === "true")
          return value.split(",").map((e) => false);
        else return "not a boolean";
      } else return value.split(",");
    } else return value;
  };

  const addC = async () => {
    store.setLoading(true);
    const converted = typeConverter(defaultValue);
    if (converted === "not a boolean") {
      store.setLoading(false);

      return Swal.fire({
        icon: "error",
        title: "Boolean values should be 'true' or 'false'",
      });
    } else if (isNaN(converted) && type !== "Array" && type !== "String") {
      store.setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Make sure you add a numerical value to the default value",
      });
    }
    const req = await fetch(HOST + "col", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: localStorage.getItem("file"),
        col,
        default: converted,
        valueType: arrayType,
      }),
    });
    const resp = await req.json();
    if (req.status === 200) {
      store.getData(localStorage.getItem("file"));
      store.getSchema();
      Swal.fire({
        icon: resp[0].status,
        title: resp[0].message,
        showConfirmButton: false,
        timer: 2000,
      });
      store.setTabNumber(0)
    } else {
      Swal.fire({
        icon: resp[0].status,
        title: resp[0].message,
      });
    }
    store.setLoading(false);
  };
  return (
    <Paper elevation={3} className="paper">
      <center>
        <h1 className="title">Add a column</h1>
        <div className="holder">
          <TextField
            className="textfield"
            id="colnameadd"
            label="Column Name"
            value={col}
            onChange={(e) => setCol(e.target.value)}
          />
          <br />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={handleChange}
            >
              {types.map((t) => (
                <MenuItem value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            className={classes.formControl}
            style={{
              display: appear === true ? "flex" : "none",
            }}
          >
            <InputLabel id="demo-simple-select-label">Array Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={arrayType}
              onChange={(e) => setArrayType(e.target.value)}
            >
              {arraytypes.map((t) => (
                <MenuItem value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="textfield"
            id="defaultval"
            label="Default value"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </div>
        <div className="buttons">
          <Button
            // className="btn"
            style={{ marginLeft: 30 }}
            variant="contained"
            color="primary"
            size="large"
            onClick={addC}
            disabled={type === ""}
          >
            Add
          </Button>
        </div>
      </center>
    </Paper>
  );
}

export default AddColumn;
