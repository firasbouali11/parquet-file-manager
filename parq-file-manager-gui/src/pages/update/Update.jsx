import { Button, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React from "react";
import Swal from "sweetalert2";
import { Context } from "../../App";
import { HOST } from "../../constants/constants";

function Update() {
  const store = React.useContext(Context);
  let keys = Object.keys(store.selected);
  let values = Object.values(store.selected);
  let updatedData = {};
  let fields;
  for (let i = 0; i < keys.length; i++) {
    if (
      JSON.stringify(values[i]).includes("{") &&
      typeof values[i] == "object"
    ) {
      values[i] = JSON.stringify(values[i]);
      updatedData[keys[i]] = values[i];
    } else updatedData[keys[i]] = values[i];
  }
  console.log(updatedData);
  fields = document.getElementsByClassName("fields");

  React.useEffect(() => {
    for (let i = 0; i < values.length; i++) {
      fields[i].getElementsByTagName("input")[0].value = values[i];
    }
    // eslint-disable-next-line
  }, [fields]);

  const fill = (e, i, col) => {
    if (store.schema[col] === "IntegerType" || store.schema[col] === "LongType")
      updatedData[col] = parseInt(
        fields[i].getElementsByTagName("input")[0].value
      );
    else if (
      store.schema[col] === "DoubleType" ||
      store.schema[col] === "FloatType"
    )
      updatedData[col] =
        parseFloat(fields[i].getElementsByTagName("input")[0].value) + 0.0;
    else if (fields[i].getElementsByTagName("input")[0].value === "")
      updatedData[col] = null;
    else if (store.schema[col] === "TimestampType")
      updatedData[col] = fields[i]
        .getElementsByTagName("input")[0]
        .value.replace("T", " ")
        .replace("Z", "");
    else updatedData[col] = fields[i].getElementsByTagName("input")[0].value;
    console.log(updatedData);
  };

  const updateData = async () => {
    store.setLoading(true);
    updatedData["filename"] = localStorage.getItem("file");

    let newValues = [];
    let newKeys = [];

    for (let i = 0; i < values.length; i++) {
      if (values[i] === null || values[i] === undefined) {
      } else {
        try {
          if (store.schema[keys[i]] === "TimestampType") {
            let r = /[0-9]+-[0-9]+-[0-9]+[T* ][0-9]+:[0-9]+:[0-9]+Z*/;
            if (!r.test(updatedData[keys[i]])) {
              store.setLoading(false);
              return Swal.fire({
                icon: "error",
                title: keys[i] + " : Timestamp format 'yyyy-mm-dd hh:mm:ss' ",
              });
            }
            // if (values[i])
            updatedData[keys[i]] = updatedData[keys[i]]
              .replaceAll("T", " ")
              .replaceAll("Z", "");
          } else if (
            store.schema[keys[i]] === "DoubleType" ||
            store.schema[keys[i]] === "FloatType"
          ) {
            updatedData[keys[i]] = parseFloat(updatedData[keys[i]]) + 0.0;
          } else if (
            store.schema[keys[i]] === "IntegerType" ||
            store.schema[keys[i]] === "LongType"
          ) {
            updatedData[keys[i]] = parseInt(updatedData[keys[i]]);
          } else if (
            store.schema[keys[i]].includes("ArrayType(String") &&
            typeof updatedData[keys[i]] !== "object"
          ) {
            updatedData[keys[i]] = updatedData[keys[i]].split(",");
          } else if (
            (store.schema[keys[i]].includes("ArrayType(Integer") ||
              store.schema[keys[i]].includes("ArrayType(Long")) &&
            typeof updatedData[keys[i]] !== "object"
          ) {
            console.log(updatedData[keys[i]]);
            updatedData[keys[i]] = updatedData[keys[i]]
              .split(",")
              .map((e) => parseInt(e));
          } else if (
            (store.schema[keys[i]].includes("ArrayType(Double") ||
              store.schema[keys[i]].includes("ArrayType(Float")) &&
            typeof updatedData[keys[i]] !== "object"
          ) {
            updatedData[keys[i]] = updatedData[keys[i]]
              .split(",")
              .map((e) => parseFloat(e));
          } else if (
            store.schema[keys[i]].includes("Map") &&
            typeof updatedData[keys[i]] !== "object"
          ) {
            updatedData[keys[i]] = JSON.parse(updatedData[keys[i]]);
          }
          if (
            !store.schema[keys[i]].includes("Array") &&
            !store.schema[keys[i]].includes("Map")
          ) {
            newValues.push(values[i] + "");
            newKeys.push(keys[i] + "");
          }
          if (
            isNaN(updatedData[keys[i]]) &&
            (store.schema[keys[i]] === "DoubleType" ||
              store.schema[keys[i]] === "IntegerType" ||
              store.schema[keys[i]] === "LongType")
          ) {
            store.setLoading(false);
            for (let i = 0; i < values.length; i++) {
              fields[i].getElementsByTagName("input")[0].value = values[i];
            }
            return Swal.fire({
              icon: "error",
              title:
                keys[i] +
                ": Make sure you add a numerical value to a numerical filed",
            });
          }
        } catch (e) {
          store.setLoading(false);
          return Swal.fire({
            icon: "error",
            title: "Check the format of JSON data",
          });
        }
      }
    }
    updatedData["selector"] = newKeys;
    updatedData["selectorValue"] = newValues;
    const req = await fetch(HOST, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    const resp = await req.json();
    store.setLoading(false);
    Swal.fire({
      icon: resp[0].status,
      title: resp[0].message,
      showConfirmButton: false,
      timer: 2000,
    });
    store.getData(localStorage.getItem("file"));
    store.setTabNumber(0);
    store.setSelected("");
  };
  return (
    <div>
      <Grid container style={{ padding: "0 100px" }}>
        {keys.map((key, i) => (
          <Grid key={i} item md={4} style={{ marginTop: 15 }}>
            <center>
              <TextField
                className="fields"
                label={key}
                onChange={(e) => {
                  fill(e, i, key);
                }}
              />
            </center>
          </Grid>
        ))}
      </Grid>
      <center style={{ marginTop: 50 }}>
        <Button variant="contained" color="primary" onClick={updateData}>
          Update
        </Button>
      </center>
    </div>
  );
}

export default Update;
