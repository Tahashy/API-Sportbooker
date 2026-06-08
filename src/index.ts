import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import usuariosRoutes from './routes/usuarios';
import proveedoresRoutes from './routes/proveedores';
import categoriasRoutes from './routes/categorias';
import espaciosRoutes from './routes/espacios';
import reservasRoutes from './routes/reservas';
import pagosRoutes from './routes/pagos';
import resenasRoutes from './routes/resenas';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/espacios', espaciosRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/resenas', resenasRoutes);

// Main route
app.get('/', (req, res) => {
  res.send({ message: 'SportBooker Mock API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
