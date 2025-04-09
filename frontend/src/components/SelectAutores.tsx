import React from "react";
import { useEffect, useState } from "react";
import { Select, SelectProps } from "./ui/Select";
import { getAutores } from "../api/axios";
import { Autor } from "../types/autor";

interface SelectAutoresProps extends Omit<SelectProps, "children"> {}

const SelectAutores: React.FC<SelectAutoresProps> = ({ ...props }) => {
  const [autores, setAutores] = useState<Autor[]>([]);

  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await getAutores();
        setAutores(response);
      } catch (error) {
        console.error("Error cargando autores:", error);
      }
    };

    fetchAutores();
  }, []);

  return (
    <Select {...props}>
      <option value="">Selecciona un autor</option>
      {autores.map((autor) => (
        <option key={autor.id} value={autor.id}>
          {autor.nombre}
        </option>
      ))}
    </Select>
  );
};

export default SelectAutores;
