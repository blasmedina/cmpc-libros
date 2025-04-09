import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()}
          {" - "}
          <span className="font-semibold">CMPC Libros</span>
        </p>
        <p className="text-sm">
          Desarrollado por <span className="font-semibold">Blas Medina</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
