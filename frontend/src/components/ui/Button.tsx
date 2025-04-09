import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400 ${props.className}`}
    >
      {children}
    </button>
  );
};
