import React from "react";
import { useEffect, useState } from "react";
import { Select, SelectProps } from "./ui/Select";
import { getEditoriales } from "../api/axios";
import { Editorial } from "../types/editorial";

interface EditorialesSelectorProps extends Omit<SelectProps, "children"> {}

const EditorialesSelector: React.FC<EditorialesSelectorProps> = ({
  ...props
}) => {
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
      <option value="">Seleccione una editorial</option>
      {editoriales.map((editorial) => (
        <option key={editorial.id} value={editorial.id}>
          {editorial.nombre}
        </option>
      ))}
    </Select>
  );
};

export default EditorialesSelector;
