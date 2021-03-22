import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "../components/Drawer";
import { Container, Divider } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import baseUrl from "../services/apiService";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: "60%",
        margin: "auto",
        paddingLeft: "20px",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 30,
        textTransform: "uppercase",
    },
    pos: {
        marginBottom: 12,
    },
});

export default function TaskView() {
    const classes = useStyles();
    const { taskId } = useParams();
    const [task, setTask] = useState({});
    const history = useHistory();
    const userType = useSelector((state) => state.isLoggedIn.userType);

    const getTaskDetails = async (taskId) => {
        let taskDetails = await axios.get(`${baseUrl}/tasks/${taskId}`);
        if (taskDetails) {
            setTask((oldState) => {
                return { ...oldState, ...taskDetails.data };
            });
        }
    };

    const deleteTask = async (taskId) => {
        let deleteTask = await axios.delete(`${baseUrl}/tasks/${taskId}`);
        if (deleteTask) {
            history.goBack();
        }
    };

    useEffect(() => {
        getTaskDetails(taskId);
    }, []);

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main>
                    <Card className={classes.root}>
                        <CardContent>
                            <IconButton
                                style={{
                                    float: "left",
                                    color: "black",
                                }}
                                variant="contained"
                                onClick={() => history.goBack()}
                            >
                                <KeyboardBackspaceIcon />
                            </IconButton>
                            <Typography
                                className={classes.title}
                                color="primary"
                                gutterBottom
                                variant="caption"
                            >
                                {task.name}
                            </Typography>
                            {userType === "admin" && (
                                <IconButton
                                    style={{
                                        float: "right",
                                        backgroundColor: "rgb(207, 48, 17)",
                                        color: "white",
                                    }}
                                    variant="contained"
                                    onClick={() => deleteTask(taskId)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            <Typography variant="subtitle2" componenet="p">
                                {task.description}
                            </Typography>
                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                style={
                                    task.isTaskCompleted
                                        ? { color: "green" }
                                        : { color: "red" }
                                }
                            >
                                Task Status:{" "}
                                {task.isTaskCompleted
                                    ? "Completed"
                                    : "Not Completed"}
                            </Typography>

                            <Divider />

                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Assigned By:{" "}
                                </span>
                                {task.assingedBy}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Assigned To:{" "}
                                </span>
                                {task.assignedTo}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Expected Completion Time:{" "}
                                </span>
                                {task.expectedCompletionTime}
                            </Typography>
                            <br />
                            {task.completedAt && (
                                <Typography variant="h6" component="h3">
                                    <span style={{ color: "darkred" }}>
                                        Task Completed In:{" "}
                                    </span>
                                    {task.completedAt}
                                </Typography>
                            )}

                            <Divider />

                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                variant="subtitle2"
                                component="p"
                            >
                                Task Created At: {task.createdAt}
                            </Typography>
                            {task.updatedAt && (
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                    variant="subtitle2"
                                    component="p"
                                >
                                    Last Updated At: {task.updatedAt}
                                </Typography>
                            )}
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </main>
            </Container>
        </>
    );
}
