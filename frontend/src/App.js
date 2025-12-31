import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import EmergencyRescueForm from "./pages/EmergencyRescueForm";
import NotificationPage from "./pages/NotificationPage";
import AdminPanel from "./pages/AdminPanel";
import UserManagement from "./pages/UserManagement"
import DonatePage from './pages/Donate';

import "./App.css";
import Donate from "./pages/Donate";
function App() {
  return (
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/EmergencyRescueForm" element={<EmergencyRescueForm />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/users" element={<UserManagement />} />
          <Route path="/donate" element={<Donate />} />
      </Routes>
    
  );
}

export default App;
