import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import StickyWall from "./pages/StickyWall";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import TodayTasks from "./pages/Today";
import UpcomingTasks from "./pages/Upcoming";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/upcoming"
          element={
            <DashboardLayout>
              <UpcomingTasks />
            </DashboardLayout>
          }
        />
        <Route
          path="/today"
          element={
            <DashboardLayout>
              <TodayTasks />
            </DashboardLayout>
          }
        />
        <Route
          path="/sticky-wall"
          element={
            <DashboardLayout>
              <StickyWall />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
