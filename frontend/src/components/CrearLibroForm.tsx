import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import Label from "./ui/Label";
import AutoresSelector from "./AutoresSelector";
import EditorialesSelector from "./EditorialesSelector";
import GenerosSelector from "./GenerosSelector";
import DisponibilidadSelector from "./DisponibilidadSelector";
import { createLibro } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../config/constants";

const CrearLibroForm = () => {
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [editorialId, setEditorialId] = useState("");
  const [precio, setPrecio] = useState(0);
  const [disponible, setDisponible] = useState(true);
  const [generoId, setGeneroId] = useState("");
  const [imagen, setImagen] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("autorId", autorId);
      formData.append("editorialId", editorialId);
      formData.append("precio", precio.toString());
      formData.append("disponible", disponible.toString());
      formData.append("generoId", generoId);

      if (imagen) {
        formData.append("imagen", imagen);
      }

      const response = await createLibro(formData);
      console.debug("Libro creado:", response);

      navigate(PATHS.LIBRO_INDEX);
    } catch (error) {
      setError("Hubo un error al crear el libro.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Agregar Libro</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Título</Label>
          <Input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Autor</Label>
          <AutoresSelector
            required
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          />
        </div>
        <div>
          <Label>Editorial</Label>
          <EditorialesSelector
            value={editorialId}
            onChange={(e) => setEditorialId(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Género</Label>
          <GenerosSelector
            value={generoId}
            onChange={(e) => setGeneroId(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Disponible</Label>
          <DisponibilidadSelector
            name="disponible"
            required
            value={disponible.toString()}
            onChange={() => setDisponible(!disponible)}
          />
        </div>
        <div>
          <Label>Precio</Label>
          <div className="flex items-center rounded-md shadow-sm border border-gray-300 px-3">
            <span className="text-gray-500">$</span>
            <Input
              className="border-none focus:ring-0 focus:outline-none w-full px-2 py-1"
              type="number"
              min={0}
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <div>
          <Label>Imagen</Label>
          <Input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100"
            onChange={(e) => setImagen(e.target.files?.[0] || null)}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        Crear Libro
      </Button>
    </form>
  );
};

export default CrearLibroForm;
