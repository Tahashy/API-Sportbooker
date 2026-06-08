import { Router } from 'express';
import { db, getNextId } from '../db';
import { Resena } from '../types';

const router = Router();

router.get('/espacio/:espacioId', (req, res) => {
  const resenas = db.resenas.filter(r => r.espacioId === req.params.espacioId);
  res.json({ resenas });
});

router.post('/', (req, res) => {
  const data = req.body;
  const nuevaResena: Resena = {
    ...data,
    id: getNextId('rev'),
    usuarioId: data.usuarioId || getNextId('usr'),
    nombreUsuario: data.nombreUsuario || 'Usuario Anónimo',
    avatarUsuario: data.avatarUsuario || 'https://i.pravatar.cc/150',
    fecha: new Date().toISOString().split('T')[0]
  };
  db.resenas.push(nuevaResena);
  res.status(201).json({ resena: nuevaResena });
});

export default router;
