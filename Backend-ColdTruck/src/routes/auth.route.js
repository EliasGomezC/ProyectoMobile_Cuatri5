const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User.model');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ error: 'User dont find' });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ error: 'wrong password' });
        }

        res.json({
            message: 'Login exitoso',
            user: {
                id: usuario._id,
                name: usuario.name,
                lastName: usuario.lastName,
                secondLastName: usuario.secondLastName,
                email: usuario.email,
                phoneNumber: usuario.phoneNumber,
                license: usuario.license,
                registrationDate: usuario.registrationDate,
                status: usuario.status,
                profilePicture: usuario.profilePicture,
                role: usuario.role
            }
        });
    } catch (error) {
        console.error('Error in the login:', error);
        res.status(500).json({ error: 'Error of server' });
    }
});

module.exports = router;