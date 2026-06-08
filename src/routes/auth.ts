import { Router } from 'express';
import { db, getNextId } from '../db';
import { Usuario } from '../types';

const router = Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = db.usuarios.find(u => u.email === email);
  
  if (!usuario) {
    // Simulamos que cualquier login es exitoso devolviendo el primer usuario
    // si el correo no existe en nuestra db mock.
    const mockUser = db.usuarios[0];
    return res.json({ usuario: mockUser, token: "mock-jwt-token" });
  }
  
  res.json({ usuario, token: "mock-jwt-token" });
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { nombre, apellido, email, password, rol } = req.body;
  
  const nuevoUsuario: Usuario = {
    id: getNextId('usr'),
    nombre,
    apellido,
    email,
    telefono: "",
    ciudad: "",
    avatar: "https://i.pravatar.cc/150",
    rol: rol || "usuario",
    fechaRegistro: new Date().toISOString().split('T')[0],
    verificado: true
  };
  
  db.usuarios.push(nuevoUsuario);
  
  res.status(201).json({ usuario: nuevoUsuario, token: "mock-jwt-token" });
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ message: "Logout exitoso" });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  res.json({ usuario: db.usuarios[0] });
});

export default router;
