export interface Usuario {
  id?: number;
  nombre: string;
  rol: Rol;
  activo: boolean;
}

export interface Rol {
  id?: number;
  nombre: string;
  usuarios?: Usuario[];
}
