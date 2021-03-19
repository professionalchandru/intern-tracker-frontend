import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import componenets and pages
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";

const ProjectCreate = () => {
    const [project, setProject] = useState({
        projectName: "",
        projectEstimatedCompletionTime: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProject({ ...project, [name]: value });
    };

    const createProject = async (e) => {
        e.preventDefault();
        if (project.projectName && project.projectEstimatedCompletionTime) {
            let signupCredentials = {
                projectName: project.projectName,
                projectEstimatedCompletionTime:
                    project.projectEstimatedCompletionTime,
            };
            let response = await axios.post(
                `${baseUrl}/projects/create`,
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

                // history.push("/login/project");
            }
        } else {
            console.log(project);
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
                            Create Project Profile
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
                            <br />
                            <Button
                                className="login-btn"
                                color="primary"
                                variant="contained"
                                type="submit"
                                onClick={createProject}
                            >
                                Create Project
                            </Button>
                        </form>
                    </section>
                </main>
            </Container>
        </>
    );
};

export default ProjectCreate;
