import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Navbar from './components/Navbar';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Router>
        {user && <Navbar />}
        <div className="container">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/discover" element={user ? <Discover /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={user ? "/discover" : "/login"} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
