import { Router } from 'express';
import { db } from '../db';

const router = Router();

router.get('/', (req, res) => {
  res.json({ categorias: db.categorias });
});

router.get('/:id', (req, res) => {
  const categoria = db.categorias.find(c => c.id === req.params.id);
  if (!categoria) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json({ categoria });
});

router.get('/slug/:slug', (req, res) => {
  const categoria = db.categorias.find(c => c.slug === req.params.slug);
  if (!categoria) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json({ categoria });
});

export default router;
