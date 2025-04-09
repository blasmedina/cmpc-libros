import { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import Label from "./ui/Label";
import SelectAutores from "./SelectAutores";
import SelectEditoriales from "./SelectEditoriales";
import SelectGeneros from "./SelectGeneros";
import SelectDisponibilidad from "./SelectDisponibilidad";
import { createLibro } from "../api/axios";

const CrearLibroForm = () => {
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [editorialId, setEditorialId] = useState("");
  const [precio, setPrecio] = useState(0);
  const [disponible, setDisponible] = useState(true);
  const [generoId, setGeneroId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const libroData = {
        titulo,
        autorId,
        editorialId,
        precio,
        disponible,
        generoId,
      };
      const response = await createLibro(libroData);
      console.debug("Libro creado:", response);
    } catch (error) {
      setError("Hubo un error al crear el libro.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <SelectAutores
          required
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
        />
      </div>
      <div>
        <Label>Editorial</Label>
        <SelectEditoriales
          value={editorialId}
          onChange={(e) => setEditorialId(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Género</Label>
        <SelectGeneros
          value={generoId}
          onChange={(e) => setGeneroId(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Disponible</Label>
        <SelectDisponibilidad name="disponible" required />
      </div>
      <div>
        <label>Precio</label>
        <Input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          required
        />
      </div>
      <Button type="submit">Crear Libro</Button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default CrearLibroForm;
