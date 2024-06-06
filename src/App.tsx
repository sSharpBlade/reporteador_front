import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn'; // Importa tu componente SignIn
import Usuarios from './pages/Usuarios'; // Importa tu componente Usuarios
import Conexiones from './pages/Conexiones'; // Importa tu componente Conexiones
import Plantillas from './pages/Plantillas'; // Importa tu componente Plantillas

const Layout = () => {
  const location = useLocation();
  const isSignIn = location.pathname === '/';

  return (
    <div>
      {!isSignIn && <Navbar />}
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/conexiones" element={<Conexiones />} />
          <Route path="/plantillas" element={<Plantillas />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
