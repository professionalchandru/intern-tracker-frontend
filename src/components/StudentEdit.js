import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

// import components
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";
import StudentCreateForm from "./StudentCreateForm";

const StudentEdit = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({
        name: "",
        email: "",
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

    const getStudent = async (id) => {
        let studentResponse = await axios.get(`${baseUrl}/students/${id}`);
        if (studentResponse.data) {
            setStudent(studentResponse.data);
        }
    };

    useEffect(() => {
        getStudent(id);
    }, [id]);

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                history.push("/admin/viewStudent");
            }, 3000);
        }
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setStudent({ ...student, [name]: value });
    };

    const editStudent = async (e) => {
        e.preventDefault();
        if (
            student.name &&
            student.email &&
            student.college &&
            student.yearOfPassing &&
            student.currentYear &&
            student.internRole &&
            student.company &&
            student.internDuration &&
            student.dateOfJoining
        ) {
            let EditCredentials = {
                name: student.name,
                email: student.email,
                college: student.college,
                yearOfPassing: student.yearOfPassing,
                currentYear: student.currentYear,
                internRole: student.internRole,
                company: student.company,
                internDuration: student.internDuration,
                dateOfJoining: student.dateOfJoining,
                address: student.address,
                roleInCompany: student.roleInCompany,
            };
            let response = await axios.patch(
                `${baseUrl}/students/${id}`,
                EditCredentials
            );
            // console.log(response.data.message, "res");
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
                <main>
                    <section className="center-elements">
                        <Typography variant="h4" className="typo">
                            Edit Student Profile
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
                                editStudent={editStudent}
                                edit={true}
                            />
                        </form>
                    </section>
                </main>
            </Container>
        </>
    );
};

export default StudentEdit;
