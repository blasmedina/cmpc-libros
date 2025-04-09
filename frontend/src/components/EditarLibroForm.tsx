import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getImageUrl, getLibro, updateLibro } from "../api/axios";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import EditorialesSelector from "./EditorialesSelector";
import Label from "./ui/Label";
import GenerosSelector from "./GenerosSelector";
import DisponibilidadSelector from "./DisponibilidadSelector";
import { PATHS } from "../config/constants";

const EditarLibroForm = () => {
  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [editorialId, setEditorialId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [precio, setPrecio] = useState(0);
  const [imagenUrl, setImagenUrl] = useState("");
  const [disponible, setDisponible] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const libroData = await getLibro(id!);
        setTitulo(libroData.titulo);
        setAutorId(libroData.autorId);
        setEditorialId(libroData.editorialId);
        setGeneroId(libroData.generoId);
        setImagenUrl(libroData.imagenUrl);
        setPrecio(+libroData.precio);
        setDisponible(libroData.disponible);
      } catch (err) {
        console.error("Error al obtener los datos del libro", err);
      }
    };

    fetchLibro();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedLibro = {
        titulo,
        autorId,
        editorialId,
        generoId,
        precio,
        disponible,
      };
      await updateLibro(id!, updatedLibro);
      navigate(PATHS.LIBRO_INDEX);
    } catch (err) {
      alert("Error al actualizar el libro");
    }
  };

  const handleCancel = () => {
    navigate(PATHS.LIBRO_INDEX);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Editar Libro</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Título</Label>
          <Input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Autor</Label>
          <Input
            type="text"
            placeholder="Autor"
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Editorial</Label>
          <EditorialesSelector
            name="editorialId"
            value={editorialId}
            onChange={(e) => setEditorialId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
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
          <Label>Disponible</Label>
          <DisponibilidadSelector
            value={disponible.toString()}
            name="disponible"
            required
            onChange={() => setDisponible(!disponible)}
          />
        </div>
        <div></div>
        <div>
          <img
            src={getImageUrl(imagenUrl)}
            className="object-scale-down rounded-md border"
            alt={titulo}
          />
        </div>
      </div>

      <div className="flex justify-between space-x-4">
        <Button type="submit">Actualizar Libro</Button>
        <Button
          type="button"
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default EditarLibroForm;
