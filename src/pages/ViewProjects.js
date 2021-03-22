import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

//import components and pages and services
import PersistentDrawerLeft from "../components/Drawer";
import baseUrl from "../services/apiService";
import ProjectTable from "../components/ProjectTable";

const ViewProjects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    const [success] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const getProjects = async () => {
        let response = await axios.get(`${baseUrl}/projects`);
        if (response.data.status === "failure") {
            setError(response.data.message);
            setIsError(true);
        } else {
            setProjects((old) => [...old, ...response.data]);
            setIsError(false);
            setError("");
        }
    };
    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main>
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
                    <Typography variant="h4" color="primary">
                        Projects
                    </Typography>
                    <br />
                    {!projects.length ? (
                        <Typography variant="h4" color="secondary">
                            OOPS... No Projects Found
                        </Typography>
                    ) : (
                        <ProjectTable {...projects} />
                    )}
                </main>
            </Container>
        </>
    );
};

export default ViewProjects;
