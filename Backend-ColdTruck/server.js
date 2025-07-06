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

// 👉 PRIMERO define el esquema
const usuarioSchema = new mongoose.Schema({
    _id: { type: Number, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    secondLastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    license: { type: String },
    registrationDate: { type: Date, default: Date.now },
    profilePicture: { type: String, required: true },
    status: {
        type: String,
        enum: ["Available", "On Trip", "Unavailable", "Disabled"],
        default: "Available",
        required: true,
    },
    role: { type: String, enum: ["admin", "driver"], required: true },
});

// 👉 LUEGO crea el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema, 'user');

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Crear un nuevo usuario
const bcrypt = require('bcrypt'); // encriptación
const saltRounds = 10;

// Crear un nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const { name, lastName, phoneNumber, email, password, status, image, role } = req.body;

        const existingUser = await Usuario.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = new Usuario({
            _id: { type: Number, unique: true },
            name: { type: String, required: true },
            lastName: { type: String, required: true },
            secondLastName: { type: String },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            license: { type: String },
            registrationDate: { type: Date, default: Date.now },
            profilePicture: { type: String, required: true },
            status: {
                type: String,
                enum: ["Available", "On Trip", "Unavailable", "Disabled"],
                default: "Available",
                required: true,
            },
            role: { type: String, enum: ["admin", "driver"], required: true }
        });

        await nuevoUsuario.save();

        const { password: _, ...usuarioSinPassword } = nuevoUsuario.toObject();

        res.status(201).json(usuarioSinPassword);
    } catch (err) {
        console.error('❌ Error al guardar en MongoDB:', err);
        res.status(400).json({ error: '❌ Error al crear el usuario' });
    }
});

// Endpoint para login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y password son requeridos' });
    }

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.json({
            message: 'Login exitoso',
            user: {
                id: usuario._id,
                name: usuario.name,
                lastName: usuario.lastName,
                secondLastName: usuario.secondLastName,
                email: usuario.email,
                password: usuario.password,
                phoneNumber: usuario.phoneNumber,
                license: usuario.license,
                registrationDate: usuario.registrationDate,
                status: usuario.status,
                profilePicture: usuario.profilePicture,
                role: usuario.role
            }
        });
    } catch (error) {
        console.error('❌ Error en login:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});


// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
