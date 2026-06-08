import { Router } from 'express';
import { db, getNextId } from '../db';
import { Pago } from '../types';

const router = Router();

router.get('/', (req, res) => {
  res.json({ pagos: db.pagos });
});

router.get('/usuario/:usuarioId', (req, res) => {
  const pagos = db.pagos.filter(p => p.usuarioId === req.params.usuarioId);
  res.json({ pagos });
});

router.post('/', (req, res) => {
  const data = req.body;
  const nuevoPago: Pago = {
    ...data,
    id: getNextId('pag'),
    usuarioId: data.usuarioId || getNextId('usr'),
    estado: 'pagado',
    fecha: new Date().toISOString().split('T')[0]
  };
  db.pagos.push(nuevoPago);
  res.status(201).json({ pago: nuevoPago });
});

router.put('/:id/estado', (req, res) => {
  const index = db.pagos.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Pago no encontrado" });
  }
  
  db.pagos[index].estado = req.body.estado;
  res.json({ pago: db.pagos[index] });
});

export default router;
