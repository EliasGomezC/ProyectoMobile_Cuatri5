const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const router = express.Router();
const saltRounds = 10;

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
    try {
        const { name, lastName, secondLastName, email, password, phoneNumber, license, profilePicture, status, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = new User({
            name,
            lastName,
            secondLastName,
            email,
            password: hashedPassword,
            phoneNumber,
            license,
            profilePicture,
            status,
            role
        });

        await nuevoUsuario.save();

        const { password: _, ...usuarioSinPassword } = nuevoUsuario.toObject();

        res.status(201).json(usuarioSinPassword);
    } catch (err) {
        console.error('❌ Error al guardar en MongoDB:', err);
        res.status(400).json({ error: '❌ Error al crear el usuario' });
    }
});

module.exports = router;