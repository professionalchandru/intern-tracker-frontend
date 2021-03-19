import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";
// import { Alert } from "@material-ui/lab";
// import axios from "axios";

// import components
import baseUrl from "../services/apiService";
import PersistentDrawerLeft from "../components/Drawer";

const AdminDashboard = () => {
    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main className="center-elements">
                    <h1>This is a dashboard</h1>
                </main>
            </Container>
        </>
    );
};

export default AdminDashboard;
