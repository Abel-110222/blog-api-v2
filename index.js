import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/database.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/post.js';
import commentRoutes from './routes/comments.js';
import cors from 'cors'; // Importa el paquete cors

const app = express();

// Configura bodyParser para procesar las solicitudes con cuerpo en formato JSON
app.use(bodyParser.json({ limit: '50mb' })); // You can adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Configura CORS para permitir solicitudes desde cualquier origen (*)
app.use(cors());


app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
