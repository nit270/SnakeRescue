import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import EmergencyRescueForm from "./pages/EmergencyRescueForm";
import NotificationPage from "./pages/NotificationPage";
import AdminPanel from "./pages/AdminPanel";


import "./App.css";
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
      </Routes>
    
  );
}

export default App;
