import React from "react";
import { Route, Switch } from "react-router-dom";

// import pages
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import StudentCreate from "./components/StudentCreate";
import ProjectCreate from "./components/ProjectCreate";
import AdminDashboard from "./pages/AdminDashboard";
import ViewStudents from "./pages/ViewStudents";
import ViewProjects from "./pages/ViewProjects";
import ViewWorkLog from "./pages/ViewWorkLog";
import StudentEdit from "./components/StudentEdit";
import StudentDelete from "./components/StudentDelete";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route exact path="/admin">
                    <AdminSignup />
                </Route>
                <Route exact path="/login/student">
                    <StudentLogin />
                </Route>
                <Route exact path="/login/admin">
                    <AdminLogin />
                </Route>
                <Route exact path="/admin/addStudent">
                    <StudentCreate />
                </Route>
                <Route
                    path="/admin/student/edit/:id"
                    children={<StudentEdit />}
                ></Route>
                <Route
                    path="/admin/student/delete/:id"
                    children={<StudentDelete />}
                ></Route>

                <Route exact path="/admin/addProject">
                    <ProjectCreate />
                </Route>
                <Route exact path="/admin/dashboard">
                    <AdminDashboard />
                </Route>
                <Route exact path="/admin/viewStudent">
                    <ViewStudents />
                </Route>
                <Route exact path="/admin/viewProject">
                    <ViewProjects />
                </Route>
                <Route exact path="/admin/viewWorkLog">
                    <ViewWorkLog />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
