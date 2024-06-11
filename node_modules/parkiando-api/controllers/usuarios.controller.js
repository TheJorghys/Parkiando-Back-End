const usuariosRoute = require('express').Router();
const usuariosModel = require('./../models/usuarios.model');

usuariosRoute.get('/', async (req, res) => {
    try {
        const data = await usuariosModel.allUsers();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });
    }
});

usuariosRoute.get('/:id', async (req, res) => {
    const { id: idusuario } = req.params;
    try {
        const data = await usuariosModel.getByIDUser(idusuario);
        if (data.length > 0) {
            res.status(200).json({ data: { ...data[0] } });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

usuariosRoute.post('/', async (req, res) => {
    const { nombre, apellido, correo, contraseña, habilitado } = req.body;

    if (!nombre || !apellido || !correo || !contraseña || !habilitado) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await usuariosModel.addUser({ nombre, apellido, correo, contraseña, habilitado });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

usuariosRoute.put('/:id', async (req, res) => {
    const { id: idusuario } = req.params;
    const { nombre, apellido, correo, contraseña, habilitado } = req.body;

    if (!nombre || !apellido || !correo || !contraseña || !habilitado) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const { rowCount, more } = await usuariosModel.updateUser({ idusuario, nombre, apellido, correo, contraseña, habilitado });
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

usuariosRoute.delete('/:id', async (req, res) => {
    const { id: idusuario } = req.params;
    try {
        const { rowCount, more } = await usuariosModel.deleteUser(idusuario);
        res.status(200).json({ rowCount, more });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = usuariosRoute;
