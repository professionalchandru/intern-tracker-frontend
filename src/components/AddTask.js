import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import componenets and pages
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";

const AddTask = () => {
    let { projectId } = useParams();
    const [students, setStudents] = useState([]);
    const [task, setTask] = useState({
        name: "",
        description: "",
        assignedBy: "",
        assignedTo: "",
        expectedCompletionTime: "",
        isTaskCompleted: false,
        studentId: 0,
        projectId: 0,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    const getStudents = async (projectId) => {
        let studentDetails = await axios.get(
            `${baseUrl}/students?filter[where][projectId]=${projectId}}`
        );
        console.log(studentDetails);
        if (studentDetails.data) {
            setStudents([...studentDetails.data]);
        }
    };

    useEffect(() => {
        getStudents(projectId);
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setTask({ ...task, [name]: value });
    };

    const createTask = async (e) => {
        e.preventDefault();
        if (
            task.name &&
            task.description &&
            task.studentId &&
            task.expectedCompletionTime
        ) {
            let selectedStudentName = students.filter(
                (student) => parseInt(task.studentId) === student.id
            );
            console.log(selectedStudentName[0].name, "selectedStudentName");
            let signupCredentials = {
                name: task.name,
                description: task.description,
                assingedBy: "admin",
                assignedTo: selectedStudentName[0].name,
                expectedCompletionTime: task.expectedCompletionTime,
                isTaskCompleted: task.isTaskCompleted,
                studentId: parseInt(task.studentId),
                projectId: parseInt(projectId),
            };
            let response = await axios.post(
                `${baseUrl}/tasks/create`,
                signupCredentials
            );
            console.log(response.data.message, "res");
            if (response.data.status == "failure") {
                setIsSuccess(false);
                setSuccess("");
                setError(response.data.message);
                setIsError(true);
            } else {
                setIsError(false);
                setError("");
                setSuccess(response.data.message);
                setIsSuccess(true);

                setTimeout(() => {
                    history.push(`/admin/project/view/${projectId}`);
                }, 3000);
            }
        } else {
            console.log(task);
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
                            Add New Task
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
                                label="Name"
                                id="name"
                                name="name"
                                value={task.taskName}
                                onChange={handleChange}
                            />
                            <br />
                            <TextField
                                label="Description"
                                id="description"
                                name="description"
                                value={task.description}
                                onChange={handleChange}
                            />
                            <br />
                            <TextField
                                label="Expected Completion Time"
                                id="expectedCompletionTime"
                                name="expectedCompletionTime"
                                value={task.expectedCompletionTime}
                                onChange={handleChange}
                            />

                            <div>
                                <span>
                                    <label htmlFor="taskId">
                                        Select Student
                                    </label>
                                </span>
                                <br />
                                <select
                                    value={students.id}
                                    name="studentId"
                                    id="studentId"
                                    onClick={handleChange}
                                    style={{ width: "200px" }}
                                >
                                    {students.map((student) => {
                                        return (
                                            <option
                                                value={student.id}
                                                key={student.id}
                                            >
                                                {student.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <br />
                            <br />
                            <Button
                                className="login-btn"
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={createTask}
                            >
                                Create Task
                            </Button>
                        </form>
                    </section>
                </main>
            </Container>
        </>
    );
};

export default AddTask;
