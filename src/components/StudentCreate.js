import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import components
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";

const StudentCreate = () => {
    const [student, setStudent] = useState({
        name: "",
        email: "",
        password: "",
        college: "",
        yearOfPassing: "",
        currentYear: "",
        internRole: "",
        company: "",
        internDuration: "",
        dateOfJoining: "",
        projectId: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudent({ ...student, [name]: value, projectId: 1 });
    };

    const createStudent = async (e) => {
        e.preventDefault();
        // setStudent({ ...student, projectId: "1" });
        if (
            student.name &&
            student.email &&
            student.password &&
            student.college &&
            student.yearOfPassing &&
            student.currentYear &&
            student.internRole &&
            student.company &&
            student.internDuration &&
            student.dateOfJoining &&
            student.projectId
        ) {
            let signupCredentials = {
                name: student.name,
                email: student.email,
                password: student.password,
                college: student.college,
                yearOfPassing: student.yearOfPassing,
                currentYear: student.currentYear,
                internRole: student.internRole,
                company: student.company,
                internDuration: student.internDuration,
                dateOfJoining: student.dateOfJoining,
                address: student.address,
                roleInCompany: student.roleInCompany,
                projectId: student.projectId,
            };
            let response = await axios.post(
                `${baseUrl}/students/create`,
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

                // history.push("/login/student");
            }
        } else {
            console.log(student);
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
                <section className="center-elements">
                    <Typography variant="h4" className="typo">
                        Create Student Profile
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
                            value={student.name}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Email"
                            id="email"
                            name="email"
                            value={student.email}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={student.password}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="College"
                            type="text"
                            id="college"
                            name="college"
                            value={student.college}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Year Of Passing"
                            type="text"
                            id="yearOfPassing"
                            name="yearOfPassing"
                            value={student.yearOfPassing}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Current Year"
                            type="text"
                            id="currentYear"
                            name="currentYear"
                            value={student.currentYear}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Intern Role"
                            type="text"
                            id="internRole"
                            name="internRole"
                            value={student.internRole}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Company"
                            id="company"
                            name="company"
                            value={student.company}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="Intern Duration"
                            type="text"
                            id="internDuration"
                            name="internDuration"
                            value={student.internDuration}
                            onChange={handleChange}
                        />
                        <br />
                        <TextField
                            label="DateOfJoining"
                            id="dateOfJoining"
                            name="dateOfJoining"
                            value={student.dateOfJoining}
                            onChange={handleChange}
                        />
                        <br />
                        <br />
                        <Button
                            className="login-btn"
                            color="primary"
                            variant="contained"
                            type="submit"
                            onClick={createStudent}
                        >
                            Create Student
                        </Button>
                    </form>
                </section>
            </Container>
        </>
    );
};

export default StudentCreate;
