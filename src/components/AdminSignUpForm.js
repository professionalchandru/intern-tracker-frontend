import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@material-ui/core";

const AdminSignUpForm = (admin, handleChange) => {
    console.log(admin, "admin");
    console.log(handleChange, "handleChange");
    return (
        <>
            <form>
                <TextField
                    label="Name"
                    id="name"
                    name="name"
                    value={admin.name}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Email"
                    id="email"
                    name="email"
                    value={admin.email}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="password"
                    type="password"
                    id="password"
                    name="password"
                    value={admin.password}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Company"
                    id="company"
                    name="company"
                    value={admin.company}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Address"
                    id="address"
                    name="address"
                    value={admin.address}
                    onChange={handleChange}
                />
                <br />
                <TextField
                    label="Role In Company"
                    id="roleInCompany"
                    name="roleInCompany"
                    value={admin.roleInCompany}
                    onChange={handleChange}
                />
                {/* <br />
                <br />
                <Button
                    className="login-btn"
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={signup}
                >
                    Signup
                </Button> */}
            </form>
        </>
    );
};

export default AdminSignUpForm;
