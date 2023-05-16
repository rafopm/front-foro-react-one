import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/api';

const LoginForm = () => {
  const { login: loginHandler } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setContrasena(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await login(email, contrasena);
      loginHandler(token);
      setError(null);
    } catch (error) {
      setError('Error de inicio de sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Nombre de usuario</label>
        <input type="text" value={email} onChange={handleUsernameChange} />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" value={contrasena} onChange={handlePasswordChange} />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
