import React from "react";
import { Button } from "./Button";
import { logout } from "../../api/axios";

export const Header: React.FC = () => {
  return (
    <div>
      <Button
        onClick={() => {
          logout();
        }}
      >
        logout
      </Button>
    </div>
  );
};
