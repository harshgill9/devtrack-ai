import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Jobs from "../pages/jobs/Jobs";
import Profile from "../pages/profile/Profile";
import Resumes from "../pages/resumes/Resumes";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Layout */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/jobs"
          element={
            <MainLayout>
              <Jobs />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        <Route
          path="/resumes"
          element={
            <MainLayout>
              <Resumes />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}