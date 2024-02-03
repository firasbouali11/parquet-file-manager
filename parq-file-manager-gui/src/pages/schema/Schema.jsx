import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Context } from "../../App";

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
  tableWrapper: {
    width: "50%",
    margin: "20px auto",
    maxHeight: 500,
  },
});

export default function Schema() {
  const classes = useStyles();
  const store = React.useContext(Context);

  return (
    <TableContainer className={classes.tableWrapper} component={Paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Columns</TableCell>
            <TableCell align="center">Types</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(store.schema).map((row, i) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="center">
                {Object.values(store.schema)[i]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
