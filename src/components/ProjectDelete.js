import axios from "axios";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import baseUrl from "../services/apiService";

const ProjectDelete = () => {
    const { id } = useParams();
    let history = useHistory();

    const deleteProject = async (id) => {
        let response = await axios.delete(`${baseUrl}/projects/${id}`);
        if (response.data.status === "success") {
            history.push("/admin/viewProject");
        }
    };

    useEffect(() => {
        deleteProject(id);
    }, [id]);
    return <></>;
};

export default ProjectDelete;
