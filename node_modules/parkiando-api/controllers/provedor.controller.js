const provedoresRoute = require('express').Router();
const provedoresModel = require('./../models/provedor.model');

provedoresRoute.get('/', async (req, res) => {
    try {
        const data = await provedoresModel.allProvedores();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });
    }
});

provedoresRoute.get('/:id', async (req, res) => {
    const { id: idProvedor } = req.params;
    try {
        const data = await provedoresModel.getByIDProvedor(idProvedor);
        if (data.length > 0) {
            res.status(200).json({ data: { ...data[0] } });
        } else {
            res.status(404).json({ error: 'Provedor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

provedoresRoute.post('/', async (req, res) => {
    const { nombres, apellidos, contraseña, correo, habilitado } = req.body;

    if (!nombres || !apellidos || !correo || !contraseña || !habilitado) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await provedoresModel.addProvedor({ nombres, apellidos, contraseña, correo, habilitado });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

provedoresRoute.put('/:id', async (req, res) => {
    const { id: idProvedor } = req.params;
    const { nombres, apellidos, contraseña, correo, habilitado } = req.body;

    if (!nombres || !apellidos || !correo || !contraseña || !habilitado) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await provedoresModel.updateProvedor({ idProvedor, nombres, apellidos, contraseña, correo, habilitado });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

provedoresRoute.delete('/:id', async (req, res) => {
    const { id: idProvedor } = req.params;
    try {
        const { rowCount, more } = await provedoresModel.deleteProvedor(idProvedor);
        res.status(200).json({ rowCount, more });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = provedoresRoute;