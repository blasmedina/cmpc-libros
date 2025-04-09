import React from "react";
import { Select, SelectProps } from "./ui/Select";

interface DisponibilidadSelectorProps extends Omit<SelectProps, "children"> {}

const DisponibilidadSelector: React.FC<DisponibilidadSelectorProps> = ({
  ...props
}) => {
  return (
    <Select {...props}>
      <option value="">Seleccione un estado</option>
      <option value="true">Disponibles</option>
      <option value="false">No disponibles</option>
    </Select>
  );
};

export default DisponibilidadSelector;
