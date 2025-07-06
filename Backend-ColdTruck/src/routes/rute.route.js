const express = require('express');
const Rute = require('../models/Rute.model');

const router = express.Router();

router.get('/', async (_req, res) => {
    try {
        const rutes = await Rute.find();
        res.json(rutes);
    } catch (err) {
        res.status(500).json({ error: 'Error getting routes' });
    }
});

module.exports = router;
