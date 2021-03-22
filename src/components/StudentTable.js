import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default function StudentTable(students) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let studentsArray = Object.values(students);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>College</TableCell>
                            <TableCell>Year Of Passing</TableCell>
                            <TableCell>Current Year</TableCell>
                            <TableCell>Intern Role</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Intern Duration</TableCell>
                            <TableCell>Date Of Joining</TableCell>
                            <TableCell>Edit | Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {studentsArray
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((student) => {
                                return (
                                    <TableRow key={student.id}>
                                        <TableCell>{student.id}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.college}</TableCell>
                                        <TableCell>
                                            {student.yearOfPassing}
                                        </TableCell>
                                        <TableCell>
                                            {student.currentYear}
                                        </TableCell>
                                        <TableCell>
                                            {student.internRole}
                                        </TableCell>
                                        <TableCell>{student.company}</TableCell>
                                        <TableCell>
                                            {student.internDuration}
                                        </TableCell>
                                        <TableCell>
                                            {student.dateOfJoining}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                component={Link}
                                                to={`/admin/student/edit/${student.id}`}
                                            >
                                                <EditIcon
                                                    style={{ color: "#FFCC00" }}
                                                />
                                            </IconButton>
                                            |
                                            <IconButton
                                                component={Link}
                                                to={`/admin/student/delete/${student.id}`}
                                            >
                                                <DeleteIcon color="secondary" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={studentsArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
