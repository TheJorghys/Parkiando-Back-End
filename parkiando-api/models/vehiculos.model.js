const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addVehiculo = (vehiculoData) => {
    const { idUsuario, tipo, placa } = vehiculoData;
    const query = `
    INSERT INTO dbo.vehiculo (idUsuario, tipo, placa)
    VALUES (@idUsuario, @tipo, @placa)
    `;
    const parameters = [
        { name: 'idUsuario', type: TYPES.Int, value: idUsuario },
        { name: 'tipo', type: TYPES.VarChar, value: tipo },
        { name: 'placa', type: TYPES.VarChar, value: placa },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const updateVehiculo = (vehiculoData) => {
    const { idVehiculo, idUsuario, tipo, placa } = vehiculoData;
    const query = `
    UPDATE dbo.vehiculo
    SET idUsuario = @idUsuario,
        tipo = @tipo,
        placa = @placa
    WHERE idVehiculo = @idVehiculo
    `;
    const parameters = [
        { name: 'idVehiculo', type: TYPES.Int, value: idVehiculo },
        { name: 'idUsuario', type: TYPES.Int, value: idUsuario },
        { name: 'tipo', type: TYPES.VarChar, value: tipo },
        { name: 'placa', type: TYPES.VarChar, value: placa },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const deleteVehiculo = (idVehiculo) => {
    const query = `
    DELETE FROM dbo.vehiculo
    WHERE idVehiculo = @idVehiculo
    `;
    const parameters = [
        { name: 'idVehiculo', type: TYPES.Int, value: idVehiculo },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const allVehiculos = () => {
    const query = `
    SELECT * FROM dbo.vehiculo
    `;
    return execQuery.execReadCommand(query);
};

const getByIDVehiculo = (idVehiculo) => {
    const query = `
    SELECT * FROM dbo.vehiculo
    WHERE idVehiculo = @idVehiculo
    `;
    const parameters = [
        { name: 'idVehiculo', type: TYPES.Int, value: idVehiculo },
    ];
    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    addVehiculo,
    updateVehiculo,
    deleteVehiculo,
    allVehiculos,
    getByIDVehiculo,
};
