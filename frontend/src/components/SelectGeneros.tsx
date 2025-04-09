import React from "react";
import { useEffect, useState } from "react";
import { Select, SelectProps } from "./ui/Select";
import { getGeneros } from "../api/axios";
import { Genero } from "../types/genero";

interface SelectGenerosProps extends Omit<SelectProps, "children"> {}

const SelectGeneros: React.FC<SelectGenerosProps> = ({ ...props }) => {
  const [generos, setGeneros] = useState<Genero[]>([]);

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await getGeneros();
        setGeneros(response);
      } catch (error) {
        console.error("Error cargando autores:", error);
      }
    };

    fetchGeneros();
  }, []);

  return (
    <Select {...props}>
      <option value="">Selecciona un genero</option>
      {generos.map((genero) => (
        <option key={genero.id} value={genero.id}>
          {genero.nombre}
        </option>
      ))}
    </Select>
  );
};

export default SelectGeneros;
