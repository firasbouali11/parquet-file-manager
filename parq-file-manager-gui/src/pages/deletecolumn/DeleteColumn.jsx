import React from "react";
import Paper from "@material-ui/core/Paper";
import { MenuItem, Select } from "@material-ui/core";
import { Button } from "@material-ui/core";
import "./DeleteColumn.css";
import { Context } from "../../App";
import { HOST } from "../../constants/constants";
import Swal from "sweetalert2";

function DeleteColumn() {
  const [col, setCol] = React.useState("");
  const store = React.useContext(Context);

  const deleteC = async () => {
    Swal.fire({
      title: `Do you confirm the deletion of the column ${col} ?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        store.setLoading(true);
        const req = await fetch(HOST + "col", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: localStorage.getItem("file"),
            col,
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
          store.setTabNumber(0);
        } else {
          Swal.fire({
            icon: resp[0].status,
            title: resp[0].message,
          });
        }
        store.setLoading(false);
      }
    });
  };
  return (
    <Paper elevation={3} className="paper">
      <center>
        <h1 className="title">Delete a column</h1>
        <Select
          style={{ width: "80%" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={col}
          onChange={(e) => setCol(e.target.value)}
        >
          {Object.keys(store.data[0]).map((t) => (
            <MenuItem value={t}>{t}</MenuItem>
          ))}
        </Select>
        <div className="buttons">
          <Button
            // className="btn-danger"
            color="primary"
            variant="contained"
            size="large"
            onClick={deleteC}
            disabled={col === ""}
          >
            Delete
          </Button>
        </div>
      </center>
    </Paper>
  );
}

export default DeleteColumn;
