import { Usuario, Proveedor, Categoria, Espacio, Reserva, Pago, Resena, Comision } from './types';

// Mock in-memory database
export const db = {
  usuarios: [] as Usuario[],
  proveedores: [] as Proveedor[],
  categorias: [] as Categoria[],
  espacios: [] as Espacio[],
  reservas: [] as Reserva[],
  pagos: [] as Pago[],
  resenas: [] as Resena[],
  comisiones: [] as Comision[]
};

// Populate with some dummy data
db.categorias.push({
  id: 'cat-1',
  nombre: 'Fútbol',
  slug: 'futbol',
  descripcion: 'Canchas de césped natural o sintético para fútbol',
  icono: 'Goal',
  totalEspacios: 1
});

db.usuarios.push({
  id: 'usr-1',
  nombre: 'Juan',
  apellido: 'Pérez',
  email: 'juan@example.com',
  telefono: '999888777',
  ciudad: 'Lima',
  avatar: 'https://i.pravatar.cc/150?u=juan',
  rol: 'usuario',
  fechaRegistro: '2026-06-08',
  verificado: true
});

db.proveedores.push({
  id: 'prov-1',
  usuarioId: 'usr-2',
  nombreComercial: 'Canchas El Golazo',
  descripcion: 'Las mejores canchas del sur',
  ciudad: 'Lima',
  telefono: '999111222',
  email: 'contacto@elgolazo.com',
  logo: 'https://i.pravatar.cc/150?u=prov',
  calificacion: 4.5,
  totalEspacios: 1,
  fechaRegistro: '2026-06-01',
  verificado: true
});

db.espacios.push({
  id: 'esp-1',
  nombre: 'Cancha 1 - Fútbol 7',
  slug: 'cancha-1-futbol-7',
  categoriaId: 'cat-1',
  proveedorId: 'prov-1',
  descripcion: 'Cancha sintética para 7 jugadores.',
  ciudad: 'Lima',
  direccion: 'Av. Las Palmas 123',
  precioPorHora: 80,
  calificacion: 4.8,
  totalResenas: 10,
  capacidad: 14,
  imagenes: [
    {
      id: 'img-1',
      espacioId: 'esp-1',
      url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68',
      alt: 'Cancha principal',
      esPrincipal: true
    }
  ],
  amenidades: ['Duchas', 'Estacionamiento', 'Cafetería'],
  reglas: ['Uso de zapatillas adecuadas', 'Prohibido tomar alcohol'],
  disponibilidad: [
    {
      dia: 'Lunes',
      abierto: true,
      horaApertura: '08:00',
      horaCierre: '23:00'
    }
  ],
  disponibleAhora: true,
  destacado: true,
  fechaPublicacion: '2026-06-01'
});

export const getNextId = (prefix: string) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
