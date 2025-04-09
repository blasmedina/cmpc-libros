import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="p-4 space-y-6">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
