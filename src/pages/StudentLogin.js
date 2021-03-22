import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";

// component imports
import baseUrl from "../services/apiService";
import AdminLoginRoute from "../components/AdminLoginRoute";
const StudentLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const logIn = async (e) => {
        e.preventDefault();
        setIsError(false);
        setError("");
        if (email && password) {
            let loginCredentials = {
                email,
                password,
            };
            let response = await axios.post(
                `${baseUrl}/student/login`,
                loginCredentials
            );
            if (response.data.status === "failure") {
                setError(response.data.message);
                setIsError(true);
            } else {
                setIsError(false);
                setError("");
                dispatch(
                    login({
                        id: response.data.id,
                        email: email,
                        userType: response.data.userType,
                        token: "",
                    })
                );
                history.push("/student/taskList");
            }
        } else {
            setError("please fill all details");
            setIsError(true);
        }
    };

    return (
        <>
            <Container>
                <section className="center-elements">
                    <Typography variant="h4" className="typo">
                        Student Login
                    </Typography>
                </section>
                <section className="center-elements" style={{ width: "30%" }}>
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
                </section>
                <section className="center-elements">
                    <form>
                        <TextField
                            label="Email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <TextField
                            label="password"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button
                            className="login-btn"
                            color="primary"
                            variant="contained"
                            type="submit"
                            onClick={logIn}
                        >
                            Login
                        </Button>
                        <br />
                        <br />
                        <AdminLoginRoute />
                    </form>
                </section>
            </Container>
        </>
    );
};

export default StudentLogin;
