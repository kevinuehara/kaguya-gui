import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";

import "./data-table.component.css";

const DataTable = ({ columns, dataset, handleDelete}) => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={col}>{col}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataset.map((data) => (
          <TableRow key={data._id}>
            <TableCell>{data.phrase}</TableCell>
            <TableCell>{data.author}</TableCell>
            <TableCell>{formatDate(data.createdAt)}</TableCell>
            <TableCell 
                onClick={() => handleDelete(data._id)}>
                <DeleteIcon className="icon"/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

function formatDate(date) {
  return date ? moment(date).format("DD/MM/YYYY") : "";
}

export default DataTable;
