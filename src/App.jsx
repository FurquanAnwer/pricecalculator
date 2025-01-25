import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/Dashboard';
import PublicPricingTool from './Pages/PublicPricingTool';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated}/> : <Navigate to="/login" />
          }
        />
        <Route path="/publicpricingtool" element={<PublicPricingTool/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>

    </Provider>
      );
};

export default App;
