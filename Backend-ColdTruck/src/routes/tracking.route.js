const express = require('express');
const Tracking = require('../models/Tracking.model');
const router = express.Router();

router.post('/tracking', async (req, res) => {
    try {
        const { coordinates, dateTime, IDTrip } = req.body;

        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
        return res.status(400).json({ error: 'coordinates must be [lng, lat]' });
        }

        const newTracking = new Tracking({
            coordinates,
            dateTime,
            IDTrip
        });

        // ¡SIEMPRE responde!
        return res.status(201).json(newTracking);
    } catch (error) {
        console.error('Error al guardar tracking:', error);
        
        const code = error.name === 'ValidationError' ? 400 : 500;
        return res.status(code).json({ error: error.message });
    }
});


router.get('/tracking', async (req, res) => {
    try {
        const trackings = await Tracking.find()
        res.json(trackings);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tracking' });
    }
})

module.exports = router;