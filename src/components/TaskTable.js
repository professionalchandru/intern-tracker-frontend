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
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
});

export default function TaskTable(tasks) {
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

    let tasksArray = Object.values(tasks);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Assigned By</TableCell>
                            <TableCell>Assigned To</TableCell>
                            {/* <TableCell>Project</TableCell> */}
                            <TableCell>Task Status</TableCell>
                            <TableCell>View | Edit </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tasksArray
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((task) => {
                                return (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell>{task.assingedBy}</TableCell>
                                        <TableCell>{task.assignedTo}</TableCell>
                                        {/* <TableCell>{task.project}</TableCell> */}
                                        <TableCell>
                                            {task.isTaskCompleted
                                                ? "Completed"
                                                : "Not Completed"}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                component={Link}
                                                to={`/student/task/view/${task.id}`}
                                            >
                                                <VisibilityIcon color="primary" />
                                            </IconButton>
                                            |
                                            <IconButton
                                                component={Link}
                                                to={`/student/task/edit/${task.id}`}
                                            >
                                                <EditIcon
                                                    style={{ color: "#FFCC00" }}
                                                />
                                            </IconButton>
                                            {/* |
                                            <IconButton
                                                component={Link}
                                                to={`/student/task/delete/${task.id}`}
                                            >
                                                <DeleteIcon />
                                            </IconButton> */}
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
                count={tasksArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
