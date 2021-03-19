import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const StudentCreateForm = ({
    name,
    email,
    password,
    college,
    yearOfPassing,
    currentYear,
    internRole,
    company,
    internDuration,
    dateOfJoining,
    handleChange,
    editStudent,
    projects,
    createStudent,
    edit,
}) => {
    let newProjects;
    if (!edit) {
        newProjects = Object.values(projects);
    }
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
            {!edit && (
                <TextField
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            )}
            <br />
            <TextField
                label="College"
                type="text"
                id="college"
                name="college"
                value={college}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Year Of Passing"
                type="text"
                id="yearOfPassing"
                name="yearOfPassing"
                value={yearOfPassing}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Current Year"
                type="text"
                id="currentYear"
                name="currentYear"
                value={currentYear}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="Intern Role"
                type="text"
                id="internRole"
                name="internRole"
                value={internRole}
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
                label="Intern Duration"
                type="text"
                id="internDuration"
                name="internDuration"
                value={internDuration}
                onChange={handleChange}
            />
            <br />
            <TextField
                label="DateOfJoining"
                id="dateOfJoining"
                name="dateOfJoining"
                value={dateOfJoining}
                onChange={handleChange}
            />
            <br />
            {!edit && (
                <div>
                    <span>
                        <label htmlFor="projectId">Select Project</label>
                    </span>
                    <br />
                    <select
                        value={newProjects.id}
                        name="projectId"
                        id="projectId"
                        onChange={handleChange}
                        style={{ width: "200px" }}
                    >
                        {newProjects.map((project) => {
                            return (
                                <option value={project.id} key={project.id}>
                                    {project.projectName}
                                </option>
                            );
                        })}
                    </select>
                </div>
            )}

            <br />
            <br />
            {edit && (
                <Button
                    className="login-btn"
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={editStudent}
                >
                    {edit && "Update Student"}
                    {!edit && "Create Student"}
                </Button>
            )}
            {!edit && (
                <Button
                    className="login-btn"
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={createStudent}
                >
                    {!edit && "Create Student"}
                </Button>
            )}
        </>
    );
};

export default StudentCreateForm;
