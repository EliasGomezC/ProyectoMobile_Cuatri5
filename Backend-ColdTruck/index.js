const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://eliasgcueva:tomate24@0323106016.r9od6qy.mongodb.net/ColdTruck?retryWrites=true&w=majority&appName=0323106016')
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error al conectar a MongoDB Atlas:', err));

// Esquema con campo username
const usuarioSchema = new mongoose.Schema({
    username: String,
    correo: String,
    contrasena: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema, 'users');

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Crear nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario({
            username: req.body.username
        });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
