import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";

const AdminSignUpForm = ({
    name,
    email,
    password,
    company,
    address,
    roleInCompany,
    handleChange,
    signup,
}) => {
    return (
        <>
            <TextField
                label="Name"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="password"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Company"
                id="company"
                name="company"
                value={company}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Address"
                id="address"
                name="address"
                value={address}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Role In Company"
                id="roleInCompany"
                name="roleInCompany"
                value={roleInCompany}
                onChange={handleChange}
            />
            <br />
            <br />
            <Button
                className="login-btn"
                color="primary"
                variant="contained"
                type="submit"
                onClick={signup}
            >
                Signup
            </Button>
        </>
    );
};

export default AdminSignUpForm;
