export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  LIBRO_INDEX: "/libros",
  LIBRO_CREATE: "/libros/crear",
  LIBRO_EDIT: (param: string) => `/libros/editar/${param}`,
} as const;
