import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const AdminLoginPage = () => {
    return (
        <div>
            <Typography
                variant="subtitle1"
                color="secondary"
                component={Link}
                to="/login/admin"
            >
                Admin Login
            </Typography>
        </div>
    );
};

export default AdminLoginPage;
