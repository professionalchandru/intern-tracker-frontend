import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "../components/Drawer";
import { Container, Divider } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import baseUrl from "../services/apiService";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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

export default function ProjectView() {
    const classes = useStyles();
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [students, setStudents] = useState([]);
    const [tasks, setTasks] = useState([]);
    const history = useHistory();

    const getProjectDetails = async (id) => {
        let projectDetails = await axios.get(`${baseUrl}/projects/${id}`);
        if (projectDetails) {
            setProject((oldState) => {
                return { ...oldState, ...projectDetails.data };
            });
        }
    };

    const getStudentDetails = async (id) => {
        let studentDetails = await axios.get(
            `${baseUrl}/students?filter[where][projectId]=${id}`
        );
        setStudents((oldState) => {
            return [...oldState, ...studentDetails.data];
        });
    };

    const getTasksDetails = async (id) => {
        let taskDetails = await axios.get(
            `${baseUrl}/tasks?filter[where][projectId]=${id}`
        );
        setTasks((oldState) => {
            return [...oldState, ...taskDetails.data];
        });
    };

    const addTask = async (projectId) => {
        history.push(`/admin/project/${projectId}/task/add`);
    };

    useEffect(() => {
        getProjectDetails(id);
        getStudentDetails(id);
        getTasksDetails(id);
    }, [id]);

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
                                {project.projectName}
                            </Typography>
                            <Button
                                style={{ float: "right" }}
                                variant="contained"
                                color="primary"
                                onClick={() => addTask(id)}
                            >
                                Add Task
                            </Button>
                            <Typography variant="subtitle2" componenet="p">
                                {project.projectDescription}
                            </Typography>
                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                style={
                                    project.isProjectCompleted
                                        ? { color: "green" }
                                        : { color: "red" }
                                }
                            >
                                Project Status:{" "}
                                {project.isProjectCompleted
                                    ? "Completed"
                                    : "Not Completed"}
                            </Typography>

                            <Divider />

                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Students:{" "}
                                </span>
                                {students.length >= 1 &&
                                    students.map((student) => {
                                        return `${student.name}, `;
                                    })}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Tasks:{" "}
                                </span>
                                {tasks.length
                                    ? tasks.map((task) => {
                                          return (
                                              <Typography
                                                  variant="h6"
                                                  key={task.id}
                                                  style={{
                                                      paddingLeft: "20px",
                                                  }}
                                                  component={Link}
                                                  to={`/admin/project/${project.id}/task/view/${task.id}`}
                                              >
                                                  {task.name}
                                              </Typography>
                                          );
                                      })
                                    : "No Task Found"}
                            </Typography>

                            <Divider />

                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                variant="subtitle2"
                                component="p"
                            >
                                Project Created At: {project.createdAt}
                            </Typography>
                            {project.updatedAt && (
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                    variant="subtitle2"
                                    component="p"
                                >
                                    Last Updated At: {project.updatedAt}
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
