import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Columns from "../columns/Columns";
import Schema from "../schema/Schema";
import AddColumn from "../addcolumn/AddColumn";
import DeleteColumn from "../deletecolumn/DeleteColumn";
import Add from "../add/Add";
import { Context } from "../../App";
import Update from "../update/Update";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const store = React.useContext(Context);

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    store.setTabNumber(newValue);
  };

  const handleChangeIndex = (index) => {
    store.setTabNumber(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={store.tabNumber}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab disabled={!store.btnActive} label="Columns" {...a11yProps(0)} />
          <Tab disabled={!store.btnActive} label="Schema" {...a11yProps(1)} />
          <Tab disabled={!store.btnActive} label="Add" {...a11yProps(2)} />
          <Tab
            disabled={!store.btnActive || store.disbaleUpdateBtn}
            label="Update"
            {...a11yProps(3)}
          />
          <Tab
            disabled={!store.btnActive}
            label="Add Columns"
            {...a11yProps(4)}
          />
          <Tab
            disabled={!store.btnActive}
            label="Delete Columns"
            {...a11yProps(5)}
          />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={store.tabNumber}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={store.tabNumber} index={0} dir={theme.direction}>
          <Columns />
        </TabPanel>
        <TabPanel value={store.tabNumber} index={1} dir={theme.direction}>
          <Schema />
        </TabPanel>
        <TabPanel value={store.tabNumber} index={2} dir={theme.direction}>
          <Add />
        </TabPanel>
        <TabPanel value={store.tabNumber} index={3} dir={theme.direction}>
          <Update />
        </TabPanel>
        <TabPanel value={store.tabNumber} index={4} dir={theme.direction}>
          <AddColumn />
        </TabPanel>
        <TabPanel value={store.tabNumber} index={5} dir={theme.direction}>
          <DeleteColumn />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
