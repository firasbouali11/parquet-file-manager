import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Context } from "../../App";
import { HOST } from "../../constants/constants";
import CustomSearch from "../../components/custom-search/CustomSearch";
import CachedIcon from "@material-ui/icons/Cached";
import Swal from "sweetalert2";
import CModal from "../../components/modal/CModal";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell}
            align="left"
            padding={headCell ? "none" : "normal"}
            sortDirection={orderBy === headCell ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell}
              direction={orderBy === headCell ? order : "asc"}
              onClick={createSortHandler(headCell)}
            >
              {headCell}
              {orderBy === headCell ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    name,
    setOpen,
    getData,
    selected,
    btnActive,
    downloadParquetFile,
    setTabNumber,
    sendSelected,
    saveToADL,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {name}
          <Button
            variant="contained"
            color="primary"
            style={{
              marginLeft: 45,
              display: btnActive ? "" : "none",
            }}
            onClick={() => getData(localStorage.getItem("file"))}
          >
            <CachedIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ display: btnActive ? "" : "none", marginLeft: 30 }}
            onClick={downloadParquetFile}
          >
            Download
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ display: btnActive ? "" : "none", marginLeft: 30 }}
            onClick={saveToADL}
          >
            Save to ADL
          </Button>
        </Typography>
      )}

      {
        <div style={{display:"flex"}}>
          <Tooltip title="update">
            <IconButton disabled={numSelected !== 1}>
              <CreateIcon
                onClick={() => {
                  setTabNumber(3);
                  sendSelected(JSON.parse(selected[0]));
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" disabled={numSelected === 0}>
              <DeleteIcon onClick={() => setOpen(true)} />
            </IconButton>
          </Tooltip>
        </div>
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function Columns() {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();
  const store = React.useContext(Context);

  const saveToADL = async () => {
    store.setLoading(true);

    try {
      const req = await fetch(HOST + "dl/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: localStorage.getItem("file"),
          container: store.container,
          adlfilepath: store.url,
        }),
      });
      const resp = await req.json();
      console.log(resp);
      if (resp.status === "success") {
        Swal.fire({
          icon: resp.status,
          title: resp.message,
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        store.setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "You can't save to the data lake ! Check for errors !",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      store.setData([]);
      store.setBtnActive(false);
      store.setColumns([]);
      store.setName("No Data !");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: e,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    store.setLoading(false);
  };
  const deleteData = async (jsonString) => {
    let resp;
    let data = JSON.parse(jsonString);
    let keys = [];
    let values = [];
    let allKeys = Object.keys(data);
    let allValues = Object.values(data);
    for (let i = 0; i < allKeys.length; i++) {
      if (allValues[i] === null || allValues[i] === undefined)
        console.log("ok");
      else {
        if (store.schema[allKeys[i]].includes("Array") === false) {
          keys.push(allKeys[i] + "");
          values.push(allValues[i] + "");
          console.log(keys[i] + ":" + values[i]);
        }
      }
    }
    console.log(
      JSON.stringify({
        filename: localStorage.getItem("file"),
        selector: keys,
        selectorValue: values,
        many: false,
      })
    );
    let req = await fetch(HOST, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: localStorage.getItem("file"),
        selector: keys,
        selectorValue: values,
        many: false,
      }),
    });
    resp = await req.json();
    return resp;
  };

  const downloadParquetFile = async () => {
    store.setLoading(true);
    const req = await fetch(HOST + "download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: localStorage.getItem("file"),
      }),
    });

    const resp = await req.blob();
    console.log(resp);
    var csvURL = window.URL.createObjectURL(resp);
    let tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "result.zip");
    tempLink.click();

    await fetch(HOST + "clean", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: localStorage.getItem("file"),
      }),
    });
    store.setData([]);
    store.setBtnActive(false);
    store.setColumns([]);
    store.setName("No Data !");
    store.setLoading(false);
  };

  const deleteManyData = async () => {
    let responses = [];
    store.setLoading(true);
    for (let row of selected) {
      let resp = await deleteData(row);
      responses.push(resp);
    }
    for (let resp of responses) {
      if (resp[0].status !== "success") {
        Swal.fire({
          icon: resp[0].status,
          title: resp[0].message,
        });
        break;
      }
    }
    Swal.fire({
      icon: responses[0][0].status,
      title: responses[0][0].message,
      showConfirmButton: false,
      timer: 2000,
    });
    setSelected([]);
    store.getData(localStorage.getItem("file"));
    store.setLoading(false);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = store.data.map((n) => JSON.stringify(n));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <CustomSearch />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          name={store.name}
          selected={selected}
          setOpen={setOpen}
          getData={store.getData}
          history={history}
          btnActive={store.btnActive}
          downloadParquetFile={downloadParquetFile}
          setTabNumber={store.setTabNumber}
          sendSelected={store.setSelected}
          saveToADL={saveToADL}
        />
        <TableContainer style={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={store.data.length}
              columns={store.columns}
            />
            <TableBody>
              {stableSort(store.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(JSON.stringify(row));
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, JSON.stringify(row))
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          color="primary"
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      {Object.keys(store.data[0]).map((key, i) => (
                        <TableCell key={i} align="left">
                          {typeof row[key] === "object"
                            ? JSON.stringify(row[key])
                            : row[key].toString()}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={store.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={
          <Switch
            checked={dense}
            onChange={handleChangeDense}
            color="primary"
          />
        }
        label="Dense padding"
      />
      {open && (
        <CModal
          open={open}
          setOpen={setOpen}
          data={selected}
          deleteData={deleteManyData}
        />
      )}
    </div>
  );
}
