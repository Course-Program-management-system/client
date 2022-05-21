import {
  Button,
  Checkbox,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import UseListingInProgress from "../../Service/useListingInProgress";
export default function ListingPage(props) {
  const {
    data,
    columnNames,
    actions,
    inProgress,
    checkChange,
    checkbox,
    pagination,
  } = props;
  const { totalCount, onPageChange, page, take, onTakeChange } =
    pagination || {};
  const [checked, addChecked, removeChecked] =
    UseListingInProgress(checkChange);
  const useStyles = makeStyles({
    header: {
      marginTop: "1%",
      backgroundColor: "gray",
      height: "100px",
    },
    table: {
      // display: "block",
      overflowX: "auto",
      whiteSpace: "nowrap",
      width: "80%",
      margin: " 0 auto",
      marginTop: "2%",
      boxShadow:
        "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    },
    thead: {
      "& > *": {
        background: "#F57F26",
        color: "#FFFFFF",
      },
    },
    row: {
      "& > *": {
        fontSize: 18,
      },
    },
  });
  const classes = useStyles();
  const buttonStyle = {
    textTransform: "none",
    marginRight: 10,
  };
  return (
    // <TableContainer component={Paper}>
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            {checkbox && <TableCell></TableCell>}
            {columnNames.map(({ displayName }) => {
              return <TableCell>{displayName}</TableCell>;
            })}
            {actions && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((user) => }} */}
          {data.map((user) => {
            return (
              <TableRow className={classes.row} key={user._id}>
                {checkbox && (
                  <Checkbox
                    variant="primary"
                    value={checked[user._id]}
                    onChange={(e) => addChecked(user._id, true)}
                  />
                )}
                {columnNames.map(({ id }) => {
                  return (
                    <TableCell>
                      {(typeof user[id] === "undefined" && "-") || user[id]}
                    </TableCell>
                  );
                })}
                {actions?.map(
                  ({ displayName, getLink, onClick, color, type }) => {
                    if (getLink) {
                      return (
                        <Button
                          className="mt-3 mb-3"
                          color={color || "primary"}
                          variant="contained"
                          style={buttonStyle}
                          component={Link}
                          to={getLink(user, type)}
                          disabled={inProgress[user._id]}
                        >
                          <div className="text-sm">{displayName}</div>
                        </Button>
                      );
                    }
                    return (
                      <Button
                        className="mt-3 mb-3"
                        color={color || "primary"}
                        variant="contained"
                        style={buttonStyle}
                        onClick={() => onClick?.(user, type)}
                        disabled={inProgress[user._id]}
                      >
                        <div className="text-sm">{displayName}</div>
                      </Button>
                    );
                  }
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {pagination && !isNaN(totalCount) && (
        <TablePagination
          className="w-4/5 m-auto"
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={totalCount}
          rowsPerPage={take}
          page={page}
          onPageChange={(e, pageNumber) => onPageChange?.(pageNumber)}
          onRowsPerPageChange={(e) => onTakeChange?.(e.target.value)}
        />
      )}
    </>
    // </TableContainer>
  );
}
