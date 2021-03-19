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

export default function ProjectTable(projects) {
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

    let projectsArray = Object.values(projects);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Estimated Completion Time</TableCell>
                            <TableCell>Project Status</TableCell>
                            <TableCell>No Of Students Assigned</TableCell>
                            <TableCell>View | Edit | Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {projectsArray
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((project) => {
                                return (
                                    <TableRow key={project.id}>
                                        <TableCell>{project.id}</TableCell>
                                        <TableCell>
                                            {project.projectName}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                project.projectEstimatedCompletionTime
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {project.isProjectCompleted
                                                ? "Completed"
                                                : "Not Completed"}
                                        </TableCell>
                                        <TableCell>
                                            {project.noOfStudents}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                component={Link}
                                                to={`/admin/project/view/${project.id}`}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                            |
                                            <IconButton
                                                component={Link}
                                                to={`/admin/project/edit/${project.id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            |
                                            <IconButton
                                                component={Link}
                                                to={`/admin/project/delete/${project.id}`}
                                            >
                                                <DeleteIcon />
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
                count={projectsArray.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
