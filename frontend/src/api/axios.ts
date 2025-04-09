import axios from "axios";
import { Autor } from "../types/autor";
import { Genero } from "../types/genero";
import { Editorial } from "../types/editorial";
import { Libro } from "../types/libro";
import { PaginatedData } from "../types/paginatedData";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authLogin = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response;
};

export const logout = () => {
  localStorage.removeItem("token");

  window.location.href = "/login";
};

export const getLibros = async (params: any) => {
  const { data } = await api.get<PaginatedData<Libro>>("/libros", { params });

  return data;
};

export const createLibro = async (payload: any) => {
  const { data } = await api.post<Libro>("/libros", payload);

  return data;
};

export const getAutores = async () => {
  const { data } = await api.get<Autor[]>("/autores");

  return data;
};

export const getGeneros = async () => {
  const { data } = await api.get<Genero[]>("/generos");

  return data;
};

export const getEditoriales = async () => {
  const { data } = await api.get<Editorial[]>("/editoriales");

  return data;
};

export default api;
