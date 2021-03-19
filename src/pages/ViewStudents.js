import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

//import components and pages and services
import PersistentDrawerLeft from "../components/Drawer";
import baseUrl from "../services/apiService";
import StudentTable from "../components/StudentTable";

const ViewStudents = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const getStudents = async () => {
        let response = await axios.get(`${baseUrl}/students`);
        if (response.data.status == "failure") {
            setError(response.data.message);
            setIsError(true);
        } else {
            setStudents((old) => [...old, ...response.data]);
            setIsError(false);
            setError("");

            // history.push("/login/student");
        }
        console.log("student", students);
    };
    useEffect(() => {
        getStudents();
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
                        Students
                    </Typography>
                    <br />
                    {!students.length ? (
                        <Typography variant="h4" color="secondary">
                            OOPS... No Students Found
                        </Typography>
                    ) : (
                        <StudentTable {...students} />
                    )}
                </main>
            </Container>
        </>
    );
};

export default ViewStudents;
