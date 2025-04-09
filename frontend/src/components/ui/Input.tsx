import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  const defaultClassName = "border border-gray-300 rounded px-2 py-1 w-full";

  return (
    <input
      {...props}
      className={props.className ? props.className : defaultClassName}
    />
  );
};
