import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import components
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";

const TaskEdit = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState({
        expectedCompletionTime: "",
        completedAt: "",
        comments: "",
        isTaskCompleted: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    const getTask = async (taskId) => {
        let taskResponse = await axios.get(`${baseUrl}/tasks/${taskId}`);
        if (taskResponse.data) {
            setTask((oldState) => {
                return { ...oldState, ...taskResponse.data };
            });
        }
    };

    useEffect(() => {
        getTask(taskId);
    }, [taskId]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                history.push("/student/taskList");
            }, 3000);
        }
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask({ ...task, [name]: value });
    };

    const updateTask = async (e) => {
        e.preventDefault();
        if (
            task.completedAt &&
            task.expectedCompletionTime &&
            task.comments &&
            task.isTaskCompleted
        ) {
            if (task.isTaskCompleted === "true") {
                task.isTaskCompleted = true;
            } else {
                task.isTaskCompleted = false;
            }
            let EditCredentials = {
                completedAt: task.completedAt,
                expectedCompletionTime: task.expectedCompletionTime,
                comments: task.comments,
                isTaskCompleted: task.isTaskCompleted,
            };
            let response = await axios.patch(
                `${baseUrl}/tasks/${taskId}`,
                EditCredentials
            );

            if (response.data.status === "failure") {
                setIsSuccess(false);
                setSuccess("");
                setError(response.data.message);
                setIsError(true);
            } else {
                setIsError(false);
                setError("");
                setSuccess(response.data.message);
                setIsSuccess(true);
            }
        } else {
            setError("please fill all details");
            setIsError(true);
        }
    };

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main>
                    <section className="center-elements">
                        <Typography variant="h4" className="typo">
                            Edit Task Details
                        </Typography>
                    </section>
                    <section
                        className="center-elements"
                        style={{ width: "30%" }}
                    >
                        {isError && (
                            <Alert
                                onClose={() => {
                                    setIsError(false);
                                }}
                                severity="error"
                            >
                                {error}
                            </Alert>
                        )}
                        {isSuccess && (
                            <Alert
                                onClose={() => {
                                    setIsSuccess(false);
                                }}
                                severity="success"
                            >
                                {success}
                            </Alert>
                        )}
                    </section>
                    <section className="center-elements">
                        <form>
                            <TextField
                                label="Estimated Completion Time"
                                id="expectedCompletionTime"
                                name="expectedCompletionTime"
                                value={task.expectedCompletionTime}
                                onChange={handleChange}
                            />
                            <br />
                            <TextField
                                label="Time Spent"
                                id="completedAt"
                                name="completedAt"
                                value={task.completedAt}
                                onChange={handleChange}
                            />
                            <br />
                            <TextField
                                label="Comments"
                                id="comments"
                                name="comments"
                                value={task.comments}
                                onChange={handleChange}
                            />
                            <br />
                            <div>
                                <span>
                                    <label htmlFor="taskId">
                                        Select Task Status
                                    </label>
                                </span>
                                <br />
                                <select
                                    value={task.isTaskCompleted}
                                    name="isTaskCompleted"
                                    id="isTaskCompleted"
                                    onChange={handleChange}
                                    style={{ width: "200px" }}
                                >
                                    <option value="true">Completed</option>
                                    <option value="false">Not Completed</option>
                                </select>
                            </div>

                            <br />
                            <br />
                            <Button
                                className="login-btn"
                                color="secondary"
                                variant="contained"
                                style={{
                                    backgroundColor: "brown",
                                    marginRight: "5px",
                                }}
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="login-btn"
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={updateTask}
                            >
                                Update Task
                            </Button>
                        </form>
                    </section>
                </main>
            </Container>
        </>
    );
};

export default TaskEdit;
