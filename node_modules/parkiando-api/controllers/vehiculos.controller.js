const vehiculosRoute = require('express').Router();
const vehiculosModel = require('./../models/vehiculos.model');

vehiculosRoute.get('/', async (req, res) => {
    try {
        const data = await vehiculosModel.allVehiculos();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });
    }
});

vehiculosRoute.get('/:id', async (req, res) => {
    const { id: idVehiculo } = req.params;
    try {
        const data = await vehiculosModel.getByIDVehiculo(idVehiculo);
        if (data.length > 0) {
            res.status(200).json({ data: { ...data[0] } });
        } else {
            res.status(404).json({ error: 'Vehículo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

vehiculosRoute.post('/', async (req, res) => {
    const { idUsuario, tipo, placa } = req.body;

    if (!idUsuario || !tipo || !placa) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await vehiculosModel.addVehiculo({ idUsuario, tipo, placa });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

vehiculosRoute.put('/:id', async (req, res) => {
    const { id: idVehiculo } = req.params;
    const { idUsuario, tipo, placa } = req.body;

    if (!idUsuario || !tipo || !placa) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await vehiculosModel.updateVehiculo({ idVehiculo, idUsuario, tipo, placa });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

vehiculosRoute.delete('/:id', async (req, res) => {
    const { id: idVehiculo } = req.params;
    try {
        const { rowCount, more } = await vehiculosModel.deleteVehiculo(idVehiculo);
        res.status(200).
        json({ rowCount, more });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = vehiculosRoute;
