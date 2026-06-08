import { Router } from 'express';
import { db, getNextId } from '../db';
import { Proveedor } from '../types';

const router = Router();

router.get('/', (req, res) => {
  res.json({ proveedores: db.proveedores });
});

router.get('/:id', (req, res) => {
  const proveedor = db.proveedores.find(p => p.id === req.params.id);
  if (!proveedor) {
    return res.status(404).json({ message: "Proveedor no encontrado" });
  }
  res.json({ proveedor });
});

router.get('/usuario/:usuarioId', (req, res) => {
  const proveedor = db.proveedores.find(p => p.usuarioId === req.params.usuarioId);
  if (!proveedor) {
    return res.status(404).json({ message: "Proveedor no encontrado" });
  }
  res.json({ proveedor });
});

router.post('/', (req, res) => {
  const data = req.body;
  const nuevoProveedor: Proveedor = {
    ...data,
    id: getNextId('prov'),
    usuarioId: data.usuarioId || getNextId('usr'),
    calificacion: 5.0,
    totalEspacios: 0,
    fechaRegistro: new Date().toISOString().split('T')[0],
    verificado: true
  };
  db.proveedores.push(nuevoProveedor);
  res.status(201).json({ proveedor: nuevoProveedor });
});

router.put('/:id', (req, res) => {
  const index = db.proveedores.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Proveedor no encontrado" });
  }
  
  db.proveedores[index] = { ...db.proveedores[index], ...req.body };
  res.json({ proveedor: db.proveedores[index] });
});

export default router;
