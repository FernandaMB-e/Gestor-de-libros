//Estado de lectura del libro
export type EstadoLectura = 'Leyendo' | 'Leídos' | 'Pendientes por leer';

//modelo del libro que devuelve el backend
export interface Libro {
  id?: number;
  titulo: string;
  autor: string;
  anio: number;
  totalPaginas: number;
  genero: string;
  portada?: string;
  estadoLectura: string;
  tiempoLectura?: string;
  disponible: boolean;
  prestadoA?: string;
  fechaPrestamo?: string;
  favorito: boolean;
  calificacion: number;
  resena?: string;
}

//modelo de entrada para crear un nuevo libro
export interface LibroCreate {
  titulo: string;
  autor: string;
  anioPublicacion: number;
  totalPaginas: number;
  genero: string;
  portada: File | null; 
  estadoLectura: EstadoLectura | string;
  tiempoLectura: string;
  calificacion: number;
  resenia: string;
  favorito: boolean;
}