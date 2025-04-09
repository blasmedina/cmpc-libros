import { Header } from "../components/ui/Header";
import ListarLibros from "../components/ListarLibros";
import CrearLibroForm from "../components/CrearLibroForm";

const LibrosPage = () => {
  return (
    <div className="p-4">
      <Header />
      <CrearLibroForm />
      <ListarLibros />
    </div>
  );
};

export default LibrosPage;
