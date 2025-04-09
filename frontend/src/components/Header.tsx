import React from "react";
import { Button } from "./ui/Button";
import { logout } from "../api/axios";
import { Link } from "react-router-dom";
import { PATHS } from "../config/constants";

export const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
      <Link to={PATHS.HOME}>
        <h1 className="text-white text-xl font-semibold">CMPC Libros</h1>
      </Link>
      <Button
        onClick={() => logout()}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Logout
      </Button>
    </header>
  );
};
