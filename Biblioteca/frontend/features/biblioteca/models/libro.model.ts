export type EstadoLectura =
  | 'Leyendo'
  | 'Leído'
  | 'Pendiente por leer';

export interface Libro {
  _id?: string;

  titulo: string;
  autor: string;
  anio: number;
  totalPaginas: number;

  genero: string;
  portada: string;

  estadoLectura: EstadoLectura;
  tiempoLectura?: string;

  disponible: boolean;
  prestadoA?: string;
  fechaPrestamo?: string;

  favorito: boolean;
  calificacion: number;

  resena: string;
}