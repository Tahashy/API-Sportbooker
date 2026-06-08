import { Router } from 'express';
import { db } from '../db';

const router = Router();

// GET /api/usuarios
router.get('/', (req, res) => {
  res.json({ usuarios: db.usuarios });
});

// GET /api/usuarios/:id
router.get('/:id', (req, res) => {
  const usuario = db.usuarios.find(u => u.id === req.params.id);
  if (!usuario) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({ usuario });
});

// PUT /api/usuarios/:id
router.put('/:id', (req, res) => {
  const index = db.usuarios.findIndex(u => u.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  
  db.usuarios[index] = { ...db.usuarios[index], ...req.body };
  res.json({ usuario: db.usuarios[index] });
});

export default router;
