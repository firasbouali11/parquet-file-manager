import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 10%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: 800,
    maxWidth: "80%",
  },
  table: {
    maxHeight: 600,
    maxWidth: 300,
  },
}));

export default function CModal({ open, setOpen, data, deleteData }) {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };
  const columns = Object.keys(JSON.parse(data[0]));
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 id="transition-modal-title">
              You have {data.length} records to remove! are you sure ?
            </h1>
            <TableContainer style={{ maxHeight: 600 }} component={Paper}>
              <Table
                stickyHeader
                className={classes.table}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow key={i}>
                      {columns.map((col) => (
                        <TableCell align="right">
                          {JSON.parse(row)[col]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <center>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClose();
                  deleteData();
                }}
              >
                Delete
              </Button>
            </center>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
