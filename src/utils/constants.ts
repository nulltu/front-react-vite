// export const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const BASE_URL = 'https://portfolio-047f.onrender.com';

export interface IFilter {
  apellido: string;
  empresa: string;
  ingreso: string;
  nacimiento: string;
  nombre: string;
  puesto: string;
}

export const TOKEN = localStorage.getItem('token');
