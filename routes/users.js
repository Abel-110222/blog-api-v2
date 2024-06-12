import express from 'express';
import { updateProfile, createUser, } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getAllUsers, getUserById } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', createUser); // Ruta para registrar un nuevo usuario
router.put('/profile', authMiddleware, updateProfile);
router.get('/users/:id', getUserById); 
router.get('/users', getAllUsers); // Ruta para obtener un usuario por su ID

export default router;
