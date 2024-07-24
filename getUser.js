const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Modelo de usuario
const User = mongoose.model('User', new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String
}), 'users'); // Especifica el nombre de la colección aquí

// Ruta para obtener usuarios
app.get('/getUser', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Microservicio GetUser escuchando en el puerto ${port}`);
});
