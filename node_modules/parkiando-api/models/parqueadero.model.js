const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addParqueadero = (parqueaderoData) => {
    const { nombre, ubicacion, espacios, horario, habilitado, idProvedor } = parqueaderoData;
    const query = `
    INSERT INTO dbo.parqueadero (nombre, ubicacion, espacios, horario, habilitado, idProvedor)
    VALUES (@nombre, @ubicacion, @espacios, @horario, @habilitado, @idProvedor)
    `;
    const parameters = [
        { name: 'nombre', type: TYPES.VarChar, value: nombre },
        { name: 'ubicacion', type: TYPES.VarChar, value: ubicacion },
        { name: 'espacios', type: TYPES.Int, value: espacios },
        { name: 'horario', type: TYPES.VarChar, value: horario },
        { name: 'habilitado', type: TYPES.Char, value: habilitado },
        { name: 'idProvedor', type: TYPES.Int, value: idProvedor },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const updateParqueadero = (parqueaderoData) => {
    const { idParqueadero, nombre, ubicacion, espacios, horario, habilitado, idProvedor } = parqueaderoData;
    const query = `
    UPDATE dbo.parqueadero
    SET nombre = @nombre,
        ubicacion = @ubicacion,
        espacios = @espacios,
        horario = @horario,
        habilitado = @habilitado,
        idProvedor = @idProvedor
    WHERE idParqueadero = @idParqueadero
    `;
    const parameters = [
        { name: 'idParqueadero', type: TYPES.Int, value: idParqueadero },
        { name: 'nombre', type: TYPES.VarChar, value: nombre },
        { name: 'ubicacion', type: TYPES.VarChar, value: ubicacion },
        { name: 'espacios', type: TYPES.Int, value: espacios },
        { name: 'horario', type: TYPES.VarChar, value: horario },
        { name: 'habilitado', type: TYPES.Char, value: habilitado },
        { name: 'idProvedor', type: TYPES.Int, value: idProvedor },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const deleteParqueadero = (idParqueadero) => {
    const query = `
    DELETE FROM dbo.parqueadero
    WHERE idParqueadero = @idParqueadero
    `;
    const parameters = [
        { name: 'idParqueadero', type: TYPES.Int, value: idParqueadero },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const allParqueaderos = () => {
    const query = `
    SELECT * FROM dbo.parqueadero
    `;
    return execQuery.execReadCommand(query);
};

const getByIDParqueadero = (idParqueadero) => {
    const query = `
    SELECT * FROM dbo.parqueadero
    WHERE idParqueadero = @idParqueadero
    `;
    const parameters = [
        { name: 'idParqueadero', type: TYPES.Int, value: idParqueadero },
    ];
    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    addParqueadero,
    updateParqueadero,
    deleteParqueadero,
    allParqueaderos,
    getByIDParqueadero,
};