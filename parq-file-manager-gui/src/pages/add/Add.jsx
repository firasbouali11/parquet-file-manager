import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from "react";
import Swal from "sweetalert2";
import { Context } from "../../App";
import { HOST } from "../../constants/constants";

function Add() {
  const store = React.useContext(Context);
  let record = { filename: localStorage.getItem("file") };
  for (let e of store.columns) {
    record[e] = null;
  }

  const fill = (e, col) => {
    if (store.schema[col] === "IntegerType" || store.schema[col] === "LongType")
      record[col] = parseInt(e.target.value);
    else if (
      store.schema[col] === "DoubleType" ||
      store.schema[col] === "FloatType"
    )
      record[col] = parseFloat(e.target.value) + 0.0;
    else if (e.target.value === "") record[col] = null;
    else if (store.schema[col] === "TimestampType") {
      record[col] = e.target.value.replace("Z", "").replace("T", " ");
    } else record[col] = e.target.value;
    console.log(record);
  };
  const addData = async () => {
    let r = /[0-9]+-[0-9]+-[0-9]+[T* ][0-9]+:[0-9]+:[0-9]+Z*/;
    const values = Object.values(record);
    const keys = Object.keys(record);
    console.log(values);
    for (let i = 1; i < values.length; i++) {
      if (
        store.schema[keys[i]] === "TimestampType" &&
        !r.test(values[i]) &&
        values[i] != null
      ) {
        return Swal.fire({
          icon: "error",
          title: keys[i] + " : Timestamp format 'yyyy-mm-dd hh:mm:ss' ",
        });
      } else if (
        isNaN(values[i]) &&
        (store.schema[keys[i]] === "DoubleType" ||
          store.schema[keys[i]] === "IntegerType")
      ) {
        return Swal.fire({
          icon: "error",
          title:
            keys[i] +
            ": Make sure you add a numerical value to a numerical filed",
        });
      } else if (store.schema[keys[i]].includes("Map")) {
        try {
          record[keys[i]] = JSON.parse(record[keys[i]]);
        } catch (e){
          return Swal.fire({
            icon: "error",
            title: "Check if JSON data is in the right format",
          });
        }
      } else if (store.schema[keys[i]].includes("ArrayType(String")) {
        record[keys[i]] = record[keys[i]].split(",");
      } else if (
        store.schema[keys[i]].includes("ArrayType(Integer") ||
        store.schema[keys[i]].includes("ArrayType(Long")
      ) {
        record[keys[i]] = record[keys[i]].split(",").map((e) => parseInt(e));
      } else if (
        store.schema[keys[i]].includes("ArrayType(Double") ||
        store.schema[keys[i]].includes("ArrayType(Float")
      ) {
        record[keys[i]] = record[keys[i]]
          .split(",")
          .map((e) => parseFloat(e) + 0.0);
      }
    }
    store.setLoading(true);
    try {
      const req = await fetch(HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      if (req.status === 200) {
        const resp = await req.json();
        if (resp[0].status === "success") {
          Swal.fire({
            icon: "success",
            title: resp[0].message,
            showConfirmButton: false,
            timer: 2000,
          });
          store.getData(localStorage.getItem("file"));
          store.setTabNumber(0);
        }
      } else if (req.status === 400) {
        const resp = await req.json();
        if (resp[0].status === "error") {
          Swal.fire({
            icon: resp[0].status,
            title: resp[0].message,
          });
        }
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: e,
      });
    }
    store.setLoading(false);
  };

  return (
    <div>
      <Grid container style={{ padding: "0 100px" }}>
        {store.columns.map((col) => (
          <Grid key={col} item md={4} style={{ marginTop: 15 }}>
            <center>
              <TextField
                className="textfield1"
                label={col}
                onChange={(e) => fill(e, col)}
              />
            </center>
          </Grid>
        ))}
      </Grid>
      <center style={{ marginTop: 50 }}>
        <Button variant="contained" color="primary" onClick={addData}>
          Add
        </Button>
      </center>
    </div>
  );
}

export default Add;
