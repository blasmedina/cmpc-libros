import React, { useEffect, useState } from "react";
import api, { authLogin } from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const Login = () => {
  const [username, setUsername] = useState("User");
  const [password, setPassword] = useState("Pass");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/libros");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authLogin(username, password);
      login(data.access_token);
      navigate("/libros");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="login">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="User"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Ingresar</Button>
      </form>
    </div>
  );
};

export default Login;
