import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import components
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";
import StudentCreateForm from "./StudentCreateForm";

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
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        let getProjectResponse = await axios.get(`${baseUrl}/projects`);
        if (getProjectResponse) {
            setProjects((oldState) => {
                return [...oldState, ...getProjectResponse.data];
            });
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudent({ ...student, [name]: value });
    };

    const createStudent = async (e) => {
        e.preventDefault();
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
                projectId: parseInt(student.projectId),
            };
            let response = await axios.post(
                `${baseUrl}/students/create`,
                signupCredentials
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

                // history.push("/login/student");
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
                            Create Student Profile
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
                            <StudentCreateForm
                                {...student}
                                handleChange={handleChange}
                                createStudent={createStudent}
                                projects={projects}
                            />
                        </form>
                    </section>
                </main>
            </Container>
        </>
    );
};

export default StudentCreate;
