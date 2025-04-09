import React, { useEffect, useState } from "react";
import { authLogin } from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { PATHS } from "../config/constants";

const LoginForm = () => {
  const [username, setUsername] = useState("User");
  const [password, setPassword] = useState("Pass");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(PATHS.LIBRO_INDEX);
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await authLogin(username, password);
      login(data.access_token);
      navigate(PATHS.LIBRO_INDEX);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Iniciar Sesión
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Usuario"
          className="p-3 border border-gray-300 rounded-md w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          className="p-3 border border-gray-300 rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
