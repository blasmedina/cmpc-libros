import React, { useEffect, useState } from "react";
import { getImageUrl, getLibros } from "../api/axios";
import AutoresSelector from "./AutoresSelector";
import DisponibilidadSelector from "./DisponibilidadSelector";
import EditorialesSelector from "./EditorialesSelector";
import GenerosSelector from "./GenerosSelector";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Link } from "react-router-dom";
import { Libro } from "../types/libro";
import { PATHS } from "../config/constants";
import Label from "./ui/Label";

const LibrosListing = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtros, setFiltros] = useState({
    search: "",
    generoId: "",
    autorId: "",
    editorialId: "",
    disponible: true,
    offset: 0,
    limit: 10,
    orderBy: "titulo",
    orderDirection: "ASC",
  });

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        setLoading(true);
        const { rows } = await getLibros(filtros);
        setLibros(rows);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchLibros();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [filtros]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value, offset: 0 });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6">
      <h2 className="text-2xl font-bold mb-4">Listado de Libros</h2>
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Filtrar por</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          <div>
            <Label>Género</Label>
            <GenerosSelector
              name="generoId"
              value={filtros.generoId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <Label>Autor</Label>
            <AutoresSelector
              name="autorId"
              value={filtros.autorId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <Label>Editorial</Label>
            <EditorialesSelector
              name="editorialId"
              value={filtros.editorialId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <Label>Disponibilidad</Label>
            <DisponibilidadSelector
              name="disponible"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Input
            name="search"
            placeholder="Buscar por título..."
            value={filtros.search}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {loading && <p>Cargando libros...</p>}
      {!loading && (
        <>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Título</th>
                <th className="px-4 py-2 text-left">Autor</th>
                <th className="px-4 py-2 text-left">Editorial</th>
                <th className="px-4 py-2 text-left">Género</th>
                <th className="px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left">Disponible</th>
                <th className="px-4 py-2 text-left">Imagen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {libros.map((libro) => (
                <tr
                  key={libro.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">
                    <Link
                      to={PATHS.LIBRO_EDIT(libro.id)}
                      className="text-blue-500 hover:underline"
                    >
                      {libro.titulo}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{libro.autor?.nombre}</td>
                  <td className="px-4 py-2">{libro.editorial?.nombre}</td>
                  <td className="px-4 py-2">{libro.genero?.nombre}</td>
                  <td className="px-4 py-2">${libro.precio}</td>
                  <td className="px-4 py-2">
                    {libro.disponible ? "Sí" : "No"}
                  </td>
                  <td className="px-4 py-2">
                    {libro.imagenUrl ? (
                      <img
                        src={getImageUrl(libro.imagenUrl)}
                        className="w-12 h-12 object-scale-down rounded-md border"
                        alt={libro.titulo}
                      />
                    ) : (
                      <span className="text-gray-500 italic">Sin imagen</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <Button
              disabled={filtros.offset === 0}
              onClick={() =>
                setFiltros({ ...filtros, offset: filtros.offset - 1 })
              }
            >
              Anterior
            </Button>
            <span className="mx-2">Página {filtros.offset + 1}</span>
            <Button
              onClick={() =>
                setFiltros({ ...filtros, offset: filtros.offset + 1 })
              }
            >
              Siguiente
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LibrosListing;
