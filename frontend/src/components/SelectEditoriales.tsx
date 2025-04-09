import React from "react";
import { useEffect, useState } from "react";
import { Select, SelectProps } from "./ui/Select";
import { getEditoriales } from "../api/axios";
import { Editorial } from "../types/editorial";

interface SelectEditorialesProps extends Omit<SelectProps, "children"> {}

const SelectEditoriales: React.FC<SelectEditorialesProps> = ({ ...props }) => {
  const [editoriales, setEditoriales] = useState<Editorial[]>([]);

  useEffect(() => {
    const fetchEditoriales = async () => {
      try {
        const response = await getEditoriales();
        setEditoriales(response);
      } catch (error) {
        console.error("Error cargando autores:", error);
      }
    };

    fetchEditoriales();
  }, []);

  return (
    <Select {...props}>
      <option value="">Selecciona una editorial</option>
      {editoriales.map((editorial) => (
        <option key={editorial.id} value={editorial.id}>
          {editorial.nombre}
        </option>
      ))}
    </Select>
  );
};

export default SelectEditoriales;
