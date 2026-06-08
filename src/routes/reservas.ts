import { Router } from 'express';
import { db, getNextId } from '../db';
import { Reserva } from '../types';

const router = Router();

router.get('/', (req, res) => {
  res.json({ reservas: db.reservas });
});

router.get('/:id', (req, res) => {
  const reserva = db.reservas.find(r => r.id === req.params.id);
  if (!reserva) {
    return res.status(404).json({ message: "Reserva no encontrada" });
  }
  res.json({ reserva });
});

router.get('/usuario/:usuarioId', (req, res) => {
  const reservas = db.reservas.filter(r => r.usuarioId === req.params.usuarioId);
  res.json({ reservas });
});

router.get('/proveedor/:proveedorId', (req, res) => {
  const reservas = db.reservas.filter(r => r.proveedorId === req.params.proveedorId);
  res.json({ reservas });
});

router.post('/', (req, res) => {
  const data = req.body;
  const precioPorHora = data.precioPorHora || 0;
  const horas = data.horas || 0;
  const subtotal = precioPorHora * horas;
  const comision = subtotal * 0.10;
  
  const nuevaReserva: Reserva = {
    ...data,
    id: getNextId('res'),
    codigo: `SB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    usuarioId: data.usuarioId || getNextId('usr'),
    proveedorId: data.proveedorId || getNextId('prov'),
    subtotal,
    comision,
    total: subtotal + comision,
    estado: 'pendiente',
    fechaCreacion: new Date().toISOString()
  };
  
  db.reservas.push(nuevaReserva);
  res.status(201).json({ reserva: nuevaReserva });
});

router.put('/:id/estado', (req, res) => {
  const index = db.reservas.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Reserva no encontrada" });
  }
  
  db.reservas[index].estado = req.body.estado;
  res.json({ reserva: db.reservas[index] });
});

export default router;
