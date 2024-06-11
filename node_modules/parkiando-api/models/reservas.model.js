const execQuery = require('./../helpers/execQuery');
const { TYPES } = require('tedious');

const addReserva = (reservaData) => {
    const { estado, idUsuario, idProvedor, idParqueadero } = reservaData;
    const query = `
    INSERT INTO dbo.reservas (estado, idUsuario, idProvedor, idParqueadero)
    VALUES (@estado, @idUsuario, @idProvedor, @idParqueadero)
    `;
    const parameters = [
        { name: 'estado', type: TYPES.VarChar, value: estado },
        { name: 'idUsuario', type: TYPES.Int, value: idUsuario },
        { name: 'idProvedor', type: TYPES.Int, value: idProvedor },
        { name: 'idParqueadero', type: TYPES.Int, value: idParqueadero },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const updateReserva = (reservaData) => {
    const { idReserva, estado } = reservaData;
    const query = `
    UPDATE dbo.reservas
    SET estado = @estado
    WHERE idReserva = @idReserva
    `;
    const parameters = [
        { name: 'idReserva', type: TYPES.Int, value: idReserva },
        { name: 'estado', type: TYPES.VarChar, value: estado },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const deleteReserva = (idReserva) => {
    const query = `
    DELETE FROM dbo.reservas
    WHERE idReserva = @idReserva
    `;
    const parameters = [
        { name: 'idReserva', type: TYPES.Int, value: idReserva },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const allReservas = () => {
    const query = `
    SELECT * FROM dbo.reservas
    `;
    return execQuery.execReadCommand(query);
};

const getByIDReserva = (idReserva) => {
    const query = `
    SELECT * FROM dbo.reservas
    WHERE idReserva = @idReserva
    `;
    const parameters = [
        { name: 'idReserva', type: TYPES.Int, value: idReserva },
    ];
    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    addReserva,
    updateReserva,
    deleteReserva,
    allReservas,
    getByIDReserva,
};
