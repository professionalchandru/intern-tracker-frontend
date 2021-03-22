import axios from "axios";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import baseUrl from "../services/apiService";

const StudentDelete = () => {
    const { id } = useParams();
    let history = useHistory();

    const deleteStudent = async (id) => {
        let response = await axios.delete(`${baseUrl}/students/${id}`);
        if (response.data.status === "success") {
            history.push("/admin/viewStudent");
        }
    };

    useEffect(() => {
        deleteStudent(id);
    }, [id]);
    return <></>;
};

export default StudentDelete;
