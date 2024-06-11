const todosRoute = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const todosModel = require('./../models/parkiando.model');

todosRoute.get('/', async (req, res) => {
    try {
        const data = await todosModel.allTodo();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error });
    }
});

todosRoute.get('/:id', async (req, res) => {
    const { id: todoID } = req.params;
    try {
        const data = await todosModel.getByIDTodo(todoID);
        if (data.length > 0) {
            res.status(200).json({ data: { ...data[0] } });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

todosRoute.post('/', async (req, res) => {
    const todoID = uuidv4();
    const { author, todoDate, description, state } = req.body;

    if (!author || !todoDate || !description || !state) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { rowCount, more } = await todosModel.addTodo({ todoID, author, todoDate, description, state });
        res.status(200).json({ data: { rowCount, more, todoID } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

todosRoute.put('/:id', async (req, res) => {
    const { id: todoID } = req.params;
    const { author, todoDate, description, state } = req.body;

    if (!author || !todoDate || !description || !state) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const { rowCount, more } = await todosModel.updateTodo({ todoID, author, todoDate, description, state });
        res.status(200).json({ data: { rowCount, more, todoID } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

todosRoute.put('/:id/completed', async (req, res) => {
    const { id: todoID } = req.params;
    try {
        const { rowCount, more } = await todosModel.completedTodo(todoID);
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

todosRoute.put('/:id/changeState', async (req, res) => {
    const { id: todoID } = req.params;
    const { state } = req.body;

    if (!state) {
        return res.status(400).json({ error: 'State is required' });
    }

    try {
        const { rowCount, more } = await todosModel.changeState(todoID, state);
        res.status(200).json({ data: { rowCount, more } });
    } catch (error) {
        res.status(500).json({ error });
    }
});

todosRoute.delete('/:id', async (req, res) => {
    const { id: todoID } = req.params;
    try {
        const { rowCount, more } = await todosModel.deleteTodo(todoID);
        res.status(200).json({ rowCount, more });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = todosRoute;
