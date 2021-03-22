import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import components
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";

const ProjectEdit = () => {
    const { id } = useParams();
    const [project, setProject] = useState({
        projectName: "",
        projectEstimatedCompletionTime: "",
        isProjectCompleted: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    const getProject = async (id) => {
        let projectResponse = await axios.get(`${baseUrl}/projects/${id}`);
        if (projectResponse.data) {
            setProject((oldState) => {
                return { ...oldState, ...projectResponse.data };
            });
        }
    };

    useEffect(() => {
        getProject(id);
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                history.push("/admin/viewProject");
            }, 3000);
        }
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProject({ ...project, [name]: value });
    };

    const updateProject = async (e) => {
        e.preventDefault();
        if (
            project.projectName &&
            project.projectEstimatedCompletionTime &&
            project.isProjectCompleted
        ) {
            if (project.isProjectCompleted === "true") {
                project.isProjectCompleted = true;
            } else {
                project.isProjectCompleted = false;
            }
            let EditCredentials = {
                projectName: project.projectName,
                projectEstimatedCompletionTime:
                    project.projectEstimatedCompletionTime,
                isProjectCompleted: project.isProjectCompleted,
            };
            let response = await axios.patch(
                `${baseUrl}/projects/${id}`,
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

                // history.push("/login/project");
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
                            Edit Project Profile
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
                                id="projectName"
                                name="projectName"
                                value={project.projectName}
                                onChange={handleChange}
                            />
                            <br />
                            <TextField
                                label="Estimated Completion Time"
                                id="projectEstimatedCompletionTime"
                                name="projectEstimatedCompletionTime"
                                value={project.projectEstimatedCompletionTime}
                                onChange={handleChange}
                            />
                            <br />
                            <div>
                                <span>
                                    <label htmlFor="projectId">
                                        Select Project Status
                                    </label>
                                </span>
                                <br />
                                <select
                                    value={project.isProjectCompleted}
                                    name="isProjectCompleted"
                                    id="isProjectCompleted"
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
                                onClick={updateProject}
                            >
                                Update Project
                            </Button>
                        </form>
                    </section>
                </main>
            </Container>
        </>
    );
};

export default ProjectEdit;
