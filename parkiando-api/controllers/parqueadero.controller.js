const parqueaderoRoute = require('express').Router();
const parqueaderoModel = require('./../models/parqueadero.model');

parqueaderoRoute.get('/', async (req, res) => {
    try {
        const data = await parqueaderoModel.allParqueaderos();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });
    }
});

parqueaderoRoute.get('/:id', async (req, res) => {
    const { id: idParqueadero } = req.params;
    try {
        const data = await parqueaderoModel.getByIDParqueadero(idParqueadero);
        if (data.length > 0) {
            res.status(200).json({ data: { ...data[0] } });
        } else {
            res.status(404).json({ error: 'Parqueadero no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

parqueaderoRoute.post('/', async (req, res) => {
    const { nombre, ubicacion, espacios, horario, habilitado, idProvedor } = req.body;

    if (!nombre || !ubicacion || !espacios || !horario || !habilitado || !idProvedor) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await parqueaderoModel.addParqueadero({ nombre, ubicacion, espacios, horario, habilitado, idProvedor });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

parqueaderoRoute.put('/:id', async (req, res) => {
    const { id: idParqueadero } = req.params;
    const { nombre, ubicacion, espacios, horario, habilitado, idProvedor } = req.body;

    if (!nombre || !ubicacion || !espacios || !horario || !habilitado || !idProvedor) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await parqueaderoModel.updateParqueadero({ idParqueadero, nombre, ubicacion, espacios, horario, habilitado, idProvedor });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

parqueaderoRoute.delete('/:id', async (req, res) => {
    const { id: idParqueadero } = req.params;
    try {
        const { rowCount, more } = await parqueaderoModel.deleteParqueadero(idParqueadero);
        res.status(200).json({ rowCount, more });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = parqueaderoRoute;
