import React from "react";
import { Route, Switch } from "react-router-dom";

// import pages
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import StudentCreate from "./components/StudentCreate";
import ProjectCreate from "./components/ProjectCreate";

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
                <Route exact path="/students">
                    <StudentCreate />
                </Route>
                <Route exact path="/projects">
                    <ProjectCreate />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
