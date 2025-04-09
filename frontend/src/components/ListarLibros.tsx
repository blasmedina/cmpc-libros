import React, { useEffect, useState } from "react";
import { getLibros } from "../api/axios";
import { Libro } from "../types/libro";
import SelectAutores from "./SelectAutores";
import SelectDisponibilidad from "./SelectDisponibilidad";
import SelectEditoriales from "./SelectEditoriales";
import SelectGeneros from "./SelectGeneros";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setError, setLibros, setLoading } from "../redux/slices/librosSlice";
import { RootState } from "../redux/store";

const ListarLibros = () => {
  const dispatch = useAppDispatch();
  // const [libros, setLibros] = useState<Libro[]>([]);
  const {
    data: libros,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.libros);
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
        dispatch(setLoading(true));
        const { rows } = await getLibros(filtros);
        dispatch(setLibros(rows));
      } catch (err) {
        dispatch(setError("Error al cargar los libros"));
      } finally {
        dispatch(setLoading(false));
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Listado de Libros</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <SelectGeneros
          name="generoId"
          value={filtros.generoId}
          onChange={handleChange}
        />
        <SelectAutores
          name="autorId"
          value={filtros.autorId}
          onChange={handleChange}
        />
        <SelectEditoriales
          name="editorialId"
          value={filtros.editorialId}
          onChange={handleChange}
        />
        <SelectDisponibilidad
          name="disponible"
          // value={!filtros.disponible}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <Input
          name="search"
          placeholder="Buscar título..."
          value={filtros.search}
          onChange={handleChange}
        />
      </div>

      {loading && <p>Cargando libros...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <>
          <table className="w-full border-collapse border">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Editorial</th>
                <th>Género</th>
                <th>Precio</th>
                <th>Disponible</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor?.nombre}</td>
                  <td>{libro.editorial?.nombre}</td>
                  <td>{libro.genero?.nombre}</td>
                  <td>${libro.precio}</td>
                  <td>{libro.disponible ? "Sí" : "No"}</td>
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

export default ListarLibros;
