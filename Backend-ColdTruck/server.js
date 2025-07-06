const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const usersRouter = require('./src/routes/users.route');
const authRouter = require('./src/routes/auth.route');
const trackingRouter = require('./src/routes/tracking.route');
const ruteRouter = require('./src/routes/rute.route');
const tripRouter = require('./src/routes/trip.route');

// modelos
const userModel = require('./src/models/User.model');
const boxModel = require('./src/models/Box.model');
const ruteModel = require('./src/models/Rute.model');
const truckModel = require('./src/models/Truck.model');
const tripModel = require('./src/models/Trip.model');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://eliasgcueva:tomate24@0323106016.r9od6qy.mongodb.net/ColdTruck?retryWrites=true&w=majority&appName=0323106016')
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error al conectar a MongoDB Atlas:', err));

// Rutas
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', trackingRouter);
app.use('/rutes', ruteRouter);
app.use('/trips', tripRouter);


app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});