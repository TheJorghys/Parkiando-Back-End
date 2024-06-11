const reservasRoute = require('express').Router();
const reservasModel = require('./../models/reservas.model');

reservasRoute.get('/', async (req, res) => {
    try {
        const data = await reservasModel.allReservas();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });
    }
});

reservasRoute.get('/:id', async (req, res) => {
    const { id: idReserva } = req.params;
    try {
        const data = await reservasModel.getByIDReserva(idReserva);
        if (data.length > 0) {
            res.status(200).json({ data: { ...data[0] } });
        } else {
            res.status(404).json({ error: 'Reserva no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

reservasRoute.post('/', async (req, res) => {
    const { estado, idUsuario, idProvedor, idParqueadero } = req.body;

    if (!estado || !idUsuario || !idProvedor || !idParqueadero) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await reservasModel.addReserva({ estado, idUsuario, idProvedor, idParqueadero });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

reservasRoute.put('/:id', async (req, res) => {
    const { id: idReserva } = req.params;
    const { estado } = req.body;

    if (!estado) {
        return res.status(400).json({ error: 'El campo estado es obligatorio' });
    }

    try {
        const { rowCount, more } = await reservasModel.updateReserva({ idReserva, estado });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

reservasRoute.delete('/:id', async (req, res) => {
    const { id: idReserva } = req.params;
    try {
        const { rowCount, more } = await reservasModel.deleteReserva(idReserva);
        res.status(200).json({ rowCount, more });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = reservasRoute;
