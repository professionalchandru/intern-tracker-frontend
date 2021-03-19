import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        if (email && password) {
            let loginCredentials = {
                email,
                password,
            };
            let response = await axios.post(
                `${baseUrl}/admin/login`,
                loginCredentials
            );
            if (response.data.status === "failure") {
                setError(response.data.message);
                setIsError(true);
            } else {
                setIsError(false);
                setError("");
                history.push("/admin/dashboard");
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
                        Admin Login
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
                            onClick={login}
                        >
                            Login
                        </Button>
                    </form>
                    <br />
                    <Typography
                        variant="subtitle1"
                        color="secondary"
                        component={Link}
                        to="/admin"
                    >
                        Create Account
                    </Typography>
                    &nbsp;|&nbsp;
                    <Typography
                        variant="subtitle1"
                        color="secondary"
                        component={Link}
                        to="/login/student"
                    >
                        Student Login
                    </Typography>
                </section>
            </Container>
        </>
    );
};

export default AdminLogin;
