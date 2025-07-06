const express = require('express');
const Trip = require('../models/Trip.model');

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const trips = await Trip
        .find()
        .populate('IDDriver IDAdmin IDBox IDRute IDTruck');
        return res.json(trips);
    } catch (err) {
        console.error('❌ Error getting trips:', err);
        return res.status(500).json({ error: 'Error getting trips' });
    }
});

router.get('/driver/:driverId', async (req, res) => {
    try {
        // 1️⃣ Validar y convertir el parámetro
        const driverId = parseInt(req.params.driverId, 10);
        if (Number.isNaN(driverId)) {
        return res.status(400).json({ error: 'driverId must be a number' });
        }

        // 2️⃣ Buscar trips por IDDriver
        const trips = await Trip
        .find({ IDDriver: driverId })
        .populate('IDDriver IDAdmin IDBox IDRute IDTruck'); // opcional

        // 3️⃣ Responder
        return res.json(trips);
    } catch (err) {
        console.error('❌ Error getting trips by driver:', err);
        return res.status(500).json({ error: 'Error getting trips by driver' });
    }
});

module.exports = router;
