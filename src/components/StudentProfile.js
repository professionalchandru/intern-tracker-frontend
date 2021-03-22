import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PersistentDrawerLeft from "../components/Drawer";
import { Container, Divider } from "@material-ui/core";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import baseUrl from "../services/apiService";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: "60%",
        margin: "auto",
        paddingLeft: "20px",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 30,
        textTransform: "uppercase",
    },
    pos: {
        marginBottom: 12,
    },
});

export default function StudentProfile() {
    const classes = useStyles();
    const [student, setStudent] = useState({});
    const history = useHistory();
    const userType = useSelector((state) => state.isLoggedIn.userType);
    const studentId = useSelector((state) => state.isLoggedIn.userId);

    const getStudentDetails = async (studentId) => {
        let studentDetails = await axios.get(
            `${baseUrl}/students/${studentId}`
        );
        if (studentDetails) {
            setStudent((oldState) => {
                return { ...oldState, ...studentDetails.data };
            });
        }
    };

    useEffect(() => {
        getStudentDetails(studentId);
    }, [studentId]);

    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main>
                    <Card className={classes.root}>
                        <CardContent>
                            <IconButton
                                style={{
                                    float: "left",
                                    color: "black",
                                }}
                                variant="contained"
                                onClick={() => history.goBack()}
                            >
                                <KeyboardBackspaceIcon />
                            </IconButton>
                            <Typography
                                className={classes.title}
                                color="primary"
                                gutterBottom
                                variant="caption"
                            >
                                {student.name}
                            </Typography>
                            {userType === "admin" && (
                                <IconButton
                                    style={{
                                        float: "right",
                                        backgroundColor: "rgb(207, 48, 17)",
                                        color: "white",
                                    }}
                                    variant="contained"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                style={{ color: "purple", paddingLeft: "50px" }}
                            >
                                Email: {student.email}
                            </Typography>

                            <Divider />

                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    College:{" "}
                                </span>
                                {student.college}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Year Of Passing:{" "}
                                </span>
                                {student.yearOfPassing}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Current Year:{" "}
                                </span>
                                {student.currentYear}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Intern Role:{" "}
                                </span>
                                {student.internRole}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Company:{" "}
                                </span>
                                {student.company}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Intern Duration:{" "}
                                </span>
                                {student.internDuration}
                            </Typography>
                            <br />
                            <Typography variant="h6" component="h3">
                                <span style={{ color: "darkred" }}>
                                    Date Of Joining:{" "}
                                </span>
                                {student.dateOfJoining}
                            </Typography>
                            <br />

                            <Divider />

                            <Typography
                                className={classes.pos}
                                color="textSecondary"
                                variant="subtitle2"
                                component="p"
                            >
                                Student Created At: {student.createdAt}
                            </Typography>
                            {student.updatedAt && (
                                <Typography
                                    className={classes.pos}
                                    color="textSecondary"
                                    variant="subtitle2"
                                    component="p"
                                >
                                    Last Updated At: {student.updatedAt}
                                </Typography>
                            )}
                        </CardContent>
                        {/* <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions> */}
                    </Card>
                </main>
            </Container>
        </>
    );
}
