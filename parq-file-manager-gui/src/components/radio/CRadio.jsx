import React, { useRef, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button, Grid, TextField } from "@material-ui/core";
import "./CRadio.css";
import { HOST } from "../../constants/constants";
import { Context } from "../../App";
import Swal from "sweetalert2";

export default function CRadio() {
  const store = React.useContext(Context);
  const [value, setValue] = useState("local");

  let inputfile = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const readFromDataLake = async () => {
    store.setLoading(true);
    const req = await fetch(HOST + "dl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        container: store.container,
        adlfilepath: store.url,
      }),
    });
    const resp = await req.json();
    console.log(resp);
    if (resp.status !== "error" && req.status === 200) {
      localStorage.setItem("file", resp.filename);
      // store.setContainer(req.container);
      // store.setUrl(resp.adlfilepath);
      await store.setData(resp.data);
      await store.getSchema();
      store.setColumns(Object.keys(resp.data[0]));
      store.setBtnActive(true);
      store.setName("Data from datalake");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Data fetched successfully from the Datalake",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: resp.status,
        title: resp.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    store.setLoading(false);
  };

  const uploadFile = async (e) => {
    try {
      store.setLoading(true);
      let formdata = new FormData();
      formdata.append("file", e.target.files[0]);
      const resp = await fetch(HOST + "upload", {
        method: "POST",
        body: formdata,
      });
      const returning = await resp.json();
      localStorage.setItem("file", returning.filename);
      await store.getData(returning.filename);
      await store.getSchema();
      store.setName(e.target.files[0].name);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "The file is uplaoded successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (e) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: e,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    store.setLoading(false);
  };

  return (
    <Grid className="wrapper" container justifyContent="space-around">
      <input
        type="file"
        onChange={uploadFile}
        ref={inputfile}
        name=""
        id=""
        style={{ display: "none" }}
      />
      <Grid item>
        <FormControl component="fieldset" disabled={store.btnActive}>
          <RadioGroup
            row
            aria-label="method"
            name="method"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="local"
              control={<Radio color="primary" />}
              label="Local"
            />
            <FormControlLabel
              value="azure"
              control={<Radio color="primary" />}
              label="Azure"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        {value === "local" ? (
          <Button
            className="loadButton"
            variant="contained"
            disabled={store.btnActive}
            color="primary"
            onClick={() => inputfile.current.click()}
          >
            Load File
          </Button>
        ) : (
          <div style={{ display: "flex" }}>
            <TextField
              className="urlField"
              fullWidth
              label="Container of the datalake"
              variant="outlined"
              disabled={store.btnActive}
              value={store.container}
              onChange={(e) => store.setContainer(e.target.value)}
            />
            <TextField
              className="urlField"
              fullWidth
              label="Url of the azure datalake file"
              variant="outlined"
              value={store.url}
              disabled={store.btnActive}
              onChange={(e) => store.setUrl(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={readFromDataLake}
              disabled={store.btnActive}
            >
              Read
            </Button>
          </div>
        )}
      </Grid>
    </Grid>
  );
}
