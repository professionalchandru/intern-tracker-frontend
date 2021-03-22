import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useSelector } from "react-redux";

//import components and pages and services
import PersistentDrawerLeft from "../components/Drawer";
import baseUrl from "../services/apiService";
import TaskTable from "../components/TaskTable";

const ViewTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [success] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const userId = useSelector((state) => state.isLoggedIn.userId);

    const getTasks = async () => {
        let response = await axios.get(
            `${baseUrl}/tasks?filter[where][studentId]=${userId}`
        );
        if (response.data.status === "failure") {
            setError(response.data.message);
            setIsError(true);
        } else {
            setTasks((old) => [...old, ...response.data]);
            setIsError(false);
            setError("");
        }
    };
    useEffect(() => {
        getTasks();
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
                        Tasks
                    </Typography>
                    <br />
                    {!tasks.length ? (
                        <Typography variant="h4" color="secondary">
                            OOPS... No Tasks Found
                        </Typography>
                    ) : (
                        <TaskTable {...tasks} />
                    )}
                </main>
            </Container>
        </>
    );
};

export default ViewTasks;
