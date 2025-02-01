// src/app.ts
import express, { Request, Response, NextFunction } from 'express';
import documentRoutes from './routes/document.routes';

const app = express();

// Add logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Received request:', {
    method: req.method,
    path: req.path,
    body: req.body
  });
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Server is working' });
});

// Routes
app.use('/api/documents', documentRoutes);

const PORT = 3000; // Change to 3000 instead of 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});