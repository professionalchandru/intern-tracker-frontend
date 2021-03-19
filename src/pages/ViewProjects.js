import React from "react";
import { Button, TextField, Container, Typography } from "@material-ui/core";

import PersistentDrawerLeft from "../components/Drawer";
const ViewProjects = () => {
    return (
        <>
            <Container>
                <section>
                    <PersistentDrawerLeft />
                </section>
                <main className="center-elements">
                    <h1>This is a View Projects</h1>
                </main>
            </Container>
        </>
    );
};

export default ViewProjects;
