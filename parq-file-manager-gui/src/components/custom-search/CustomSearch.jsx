import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Grid, TextField } from "@material-ui/core";
import { Context } from "../../App";
import { HOST } from "../../constants/constants";
import Swal from "sweetalert2";
// import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
let searchKeys = {};

export default function CustomSearch() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const store = React.useContext(Context);

  const getSpecificData = async () => {
    store.setLoading(true);
    let keys = Object.keys(searchKeys);
    let values = Object.values(searchKeys);
    for (let i = 0; i < keys.length; i++) {
      if (values[i] === "") delete searchKeys[keys[i]];
    }
    console.log(searchKeys);
    const req = await fetch(HOST + "one", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: localStorage.getItem("file"),
        selector: Object.keys(searchKeys),
        selectorValue: Object.values(searchKeys),
      }),
    });
    const resp = await req.json();
    if (resp.length === 0) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "there is no data",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (resp[0].status === "error") {
      Swal.fire({
        position: "center",
        icon: resp[0].status,
        title: resp[0].message,
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (resp.length > 0) {
      await store.setData(resp);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Here is your data !",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    searchKeys = {};
    const reset = document.querySelectorAll(".textfield1 input");
    for (let e of reset) e.value = null;
    store.setLoading(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Custom Search</Typography>
          {/* <SearchIcon /> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            {store.columns.map((col) => (
              <Grid key={col} item md={3}>
                <center>
                  <TextField
                    className="textfield1"
                    label={col}
                    onChange={(e) => {
                      searchKeys[col] = e.target.value;
                    }}
                  />
                </center>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 30,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              display: store.btnActive ? "block" : "none",
            }}
            onClick={getSpecificData}
          >
            Search
          </Button>
        </div>
      </Accordion>
      <br />
    </div>
  );
}