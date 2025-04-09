import LibrosListing from "../components/LibrosListing";
import Layout from "../components/Layout";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../config/constants";

const LibrosPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Button onClick={() => navigate(PATHS.LIBRO_CREATE)}>Crear Libro</Button>
      <LibrosListing />
    </Layout>
  );
};

export default LibrosPage;
