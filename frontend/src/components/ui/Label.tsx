import React from "react";

interface LabelProps {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return (
    <label className="block text-sm font-semibold text-gray-800 tracking-wide mb-1">
      {children}
    </label>
  );
};

export default Label;
