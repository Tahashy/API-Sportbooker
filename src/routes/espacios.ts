import { Router } from 'express';
import { db, getNextId } from '../db';
import { Espacio } from '../types';

const router = Router();

router.get('/', (req, res) => {
  let espacios = [...db.espacios];
  
  // Basic filtering mock
  if (req.query.categoriaId) {
    espacios = espacios.filter(e => e.categoriaId === req.query.categoriaId);
  }
  if (req.query.ciudad) {
    espacios = espacios.filter(e => e.ciudad.toLowerCase() === String(req.query.ciudad).toLowerCase());
  }
  if (req.query.destacado === 'true') {
    espacios = espacios.filter(e => e.destacado);
  }
  
  res.json({ espacios });
});

router.get('/:id', (req, res) => {
  const espacio = db.espacios.find(e => e.id === req.params.id);
  if (!espacio) {
    return res.status(404).json({ message: "Espacio no encontrado" });
  }
  res.json({ espacio });
});

router.get('/slug/:slug', (req, res) => {
  const espacio = db.espacios.find(e => e.slug === req.params.slug);
  if (!espacio) {
    return res.status(404).json({ message: "Espacio no encontrado" });
  }
  res.json({ espacio });
});

router.get('/proveedor/:proveedorId', (req, res) => {
  const espacios = db.espacios.filter(e => e.proveedorId === req.params.proveedorId);
  res.json({ espacios });
});

router.post('/', (req, res) => {
  const data = req.body;
  const nuevoEspacio: Espacio = {
    ...data,
    id: getNextId('esp'),
    slug: data.nombre ? data.nombre.toLowerCase().replace(/ /g, '-') : getNextId('esp'),
    calificacion: 5.0,
    totalResenas: 0,
    disponibleAhora: true,
    fechaPublicacion: new Date().toISOString().split('T')[0]
  };
  db.espacios.push(nuevoEspacio);
  res.status(201).json({ espacio: nuevoEspacio });
});

router.put('/:id', (req, res) => {
  const index = db.espacios.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Espacio no encontrado" });
  }
  
  db.espacios[index] = { ...db.espacios[index], ...req.body };
  res.json({ espacio: db.espacios[index] });
});

router.delete('/:id', (req, res) => {
  const index = db.espacios.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Espacio no encontrado" });
  }
  
  db.espacios.splice(index, 1);
  res.json({ message: "Espacio eliminado correctamente" });
});

export default router;
