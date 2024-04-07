import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import LoginPage from './LoginPage/LoginPage';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = getUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  function handleLogout() {
  setUser(null);
  // Redirect to the login page
  return <Navigate to="/login" />;
}

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} onLogout={handleLogout} />
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/" element={<Navigate to="/orders" />} /> {/* Redirect to /orders */}
            </Routes>
          </>
          :
          <Routes>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/signup" element={<AuthPage setUser={setUser} />} />
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to /login */}
          </Routes>
      }
    </main>
  );
}
