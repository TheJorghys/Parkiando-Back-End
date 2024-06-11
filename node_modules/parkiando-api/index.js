const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const todosController = require('./controllers/todos.controller')
const usuariosController = require('./controllers/usuarios.controller');
const vehiculosController = require('./controllers/vehiculos.controller');
const provedoresController = require('./controllers/provedor.controller');
const parqueaderosController = require('./controllers/parqueadero.controller');
const reservasController = require('./controllers/reservas.controller');
dotenv.config();

const {
    API_PORT = 9000,
    SERVER_TAG = 'API SERVER LOCAL'
} = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Request client URL: ${req.get('host')} ${req.originalUrl} >>>> ${SERVER_TAG}`);
    next();
});

app.use('/api/todos', todosController);
app.use('/api/usuarios', usuariosController);
app.use('/api/vehiculos', vehiculosController);
app.use('/api/provedores', provedoresController);
app.use('/api/parqueaderos', parqueaderosController);
app.use('/api/reservas', reservasController);

app.listen(API_PORT, () => {
    console.log(`Server running on port ${API_PORT} >>>> ${SERVER_TAG}`);
});
