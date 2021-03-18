import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "@material-ui/core";

//css import
import "../index.css";

const LandingPage = () => {
    return (
        <>
            <Container>
                <section className="center-elements">
                    <h1>Welcome to Intern Tracker</h1>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login/admin"
                    >
                        Admin
                    </Button>
                    &nbsp; &nbsp;
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/login/student"
                    >
                        Student
                    </Button>
                </section>
            </Container>
        </>
    );
};

export default LandingPage;
