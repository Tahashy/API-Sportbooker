export type RolUsuario = "visitante" | "usuario" | "proveedor" | "administrador";

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ciudad: string;
  avatar: string; // URL o base64
  rol: RolUsuario;
  fechaRegistro: string; // ISO date (YYYY-MM-DD)
  verificado: boolean;
}

export interface Proveedor {
  id: string;
  usuarioId: string;
  nombreComercial: string;
  descripcion: string;
  ciudad: string;
  telefono: string;
  email: string;
  logo: string; // URL o base64
  calificacion: number; // 1-5
  totalEspacios: number;
  fechaRegistro: string; // ISO date (YYYY-MM-DD)
  verificado: boolean;
}

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string;
  icono: string; // Nombre de icono de lucide-react (ej: "Goal", "Trophy")
  totalEspacios: number;
}

export interface ImagenEspacio {
  id: string;
  espacioId: string;
  url: string;
  alt: string;
  esPrincipal: boolean;
}

export interface Disponibilidad {
  dia: string; // "Lunes", "Martes", ..., "Domingo"
  abierto: boolean;
  horaApertura: string; // "HH:MM"
  horaCierre: string; // "HH:MM"
}

export interface Espacio {
  id: string;
  nombre: string;
  slug: string;
  categoriaId: string;
  proveedorId: string;
  descripcion: string;
  ciudad: string;
  direccion: string;
  precioPorHora: number;
  calificacion: number; // 1-5
  totalResenas: number;
  capacidad: number;
  imagenes: ImagenEspacio[];
  amenidades: string[];
  reglas: string[];
  disponibilidad: Disponibilidad[];
  disponibleAhora: boolean;
  destacado: boolean;
  fechaPublicacion: string; // ISO date (YYYY-MM-DD)
}

export type EstadoReserva = "pendiente" | "confirmada" | "completada" | "cancelada";

export interface Reserva {
  id: string;
  codigo: string; // Código único (ej: "SB-ABC123")
  espacioId: string;
  usuarioId: string;
  proveedorId: string;
  fecha: string; // ISO date (YYYY-MM-DD)
  horaInicio: string; // "HH:MM"
  horaFin: string; // "HH:MM"
  horas: number;
  subtotal: number;
  comision: number; // 10% del subtotal
  total: number;
  estado: EstadoReserva;
  fechaCreacion: string; // ISO datetime
}

export type EstadoPago = "pendiente" | "pagado" | "reembolsado";

export interface Pago {
  id: string;
  reservaId: string;
  usuarioId: string;
  monto: number;
  metodo: "tarjeta" | "yape" | "plin" | "transferencia";
  estado: EstadoPago;
  fecha: string; // ISO date (YYYY-MM-DD)
  ultimosDigitos?: string;
}

export interface Resena {
  id: string;
  espacioId: string;
  usuarioId: string;
  reservaId: string;
  nombreUsuario: string;
  avatarUsuario: string;
  calificacion: number; // 1-5
  comentario: string;
  fecha: string; // ISO date (YYYY-MM-DD)
}

export interface Comision {
  id: string;
  reservaId: string;
  proveedorId: string;
  montoReserva: number;
  porcentaje: number; // 10%
  montoComision: number;
  fecha: string; // ISO date (YYYY-MM-DD)
}
