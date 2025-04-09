import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select
      {...props}
      className="border border-gray-300 rounded px-2 py-1 w-full"
    >
      {children}
    </select>
  );
};
