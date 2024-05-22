import React, { useRef } from 'react';
import './Login.css';

const Login: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRegisterClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.add('active');
    }
  };

  const handleLoginClick = () => {
    if (containerRef.current) {
      containerRef.current.classList.remove('active');
    }
  };

  return (
    <div className="container" ref={containerRef} id="container">
      <div className="form-container sign-up">
        <form>
          <h1>Crear Cuenta</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-youtube"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook"></i></a>
          </div>
          <span>o usa tu correo para registrarte</span>
          <input type="text" placeholder="Nombre" />
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <button>Registrarse</button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form>
          <h1>Iniciar Sesión</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-youtube"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook"></i></a>
          </div>
          <span>o usa tu correo y contraseña</span>
          <input type="email" placeholder="Correo" />
          <input type="password" placeholder="Contraseña" />
          <a href="#">Olvidaste tu contraseña?</a>
          <button>Iniciar Sesión</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Bienvenido de nuevo</h1>
            <p>Ingresa tus datos personales para usar la aplicación</p>
            <button className="hidden" id="login" onClick={handleLoginClick}>Iniciar Sesión</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hola, Bienvenido!</h1>
            <p>Registra tu cuenta para usar la aplicación</p>
            <button className="hidden" id="register" onClick={handleRegisterClick}>Registrarse</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
