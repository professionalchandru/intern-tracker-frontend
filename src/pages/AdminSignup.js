import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import baseUrl from "../services/apiService";
import AdminSignUpForm from "../components/AdminSignUpForm";

const AdminSignup = () => {
    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        password: "",
        company: "",
        address: "",
        roleInCompany: "",
    });
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAdmin({ ...admin, [name]: value });
    };

    const signup = async (e) => {
        e.preventDefault();
        if (
            admin.name &&
            admin.email &&
            admin.password &&
            admin.company &&
            admin.address &&
            admin.roleInCompany
        ) {
            let signupCredentials = {
                name: admin.name,
                email: admin.email,
                password: admin.password,
                company: admin.company,
                address: admin.address,
                roleInCompany: admin.roleInCompany,
            };
            let response = await axios.post(
                `${baseUrl}/admin`,
                signupCredentials
            );
            if (response.data.status == "failure") {
                setError(response.data.message);
                setIsError(true);
            } else {
                setIsError(false);
                setError("");
                history.push("/login/admin");
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
                        Admin Signup
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
                        <AdminSignUpForm
                            {...admin}
                            handleChange={handleChange}
                            signup={signup}
                        />
                        <br />
                        <br />
                        <Typography
                            component={Link}
                            to="/login/admin"
                            variant="subtitle1"
                            color="secondary"
                        >
                            Already have account? Login
                        </Typography>
                    </form>
                </section>
            </Container>
        </>
    );
};

export default AdminSignup;
