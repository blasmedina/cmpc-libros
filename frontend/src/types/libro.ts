import { Autor } from "./autor";
import { Editorial } from "./editorial";
import { Genero } from "./genero";

export interface Libro {
  id: string;
  titulo: string;
  precio: string;
  disponible: boolean;
  imagenUrl: string;
  autorId: string;
  editorialId: string;
  generoId: string;
  autor: Autor;
  editorial: Editorial;
  genero: Genero;
}
