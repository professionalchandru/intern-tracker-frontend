import React from "react";
import { Container } from "@material-ui/core";

// import components
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
