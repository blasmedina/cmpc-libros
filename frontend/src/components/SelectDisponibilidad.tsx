import React from "react";
import { Select, SelectProps } from "./ui/Select";

interface SelectDisponibilidadProps extends Omit<SelectProps, "children"> {}

const SelectDisponibilidad: React.FC<SelectDisponibilidadProps> = ({
  ...props
}) => {
  return (
    <Select {...props}>
      <option value="">Seleccion estado</option>
      <option value="true">Disponibles</option>
      <option value="false">No disponibles</option>
    </Select>
  );
};

export default SelectDisponibilidad;
