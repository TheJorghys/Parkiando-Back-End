const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addProvedor = (provedorData) => {
    const { nombres, apellidos, contraseña, correo, habilitado } = provedorData;
    const query = `
    INSERT INTO dbo.provedor (nombres, apellidos, contraseña, correo, habilitado)
    VALUES (@nombres, @apellidos, @contraseña, @correo, @habilitado)
    `;
    const parameters = [
        { name: 'nombres', type: TYPES.VarChar, value: nombres },
        { name: 'apellidos', type: TYPES.VarChar, value: apellidos },
        { name: 'contraseña', type: TYPES.VarChar, value: contraseña },
        { name: 'correo', type: TYPES.VarChar, value: correo },
        { name: 'habilitado', type: TYPES.Char, value: habilitado },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const updateProvedor = (provedorData) => {
    const { idProvedor, nombres, apellidos, contraseña, correo, habilitado } = provedorData;
    const query = `
    UPDATE dbo.provedor
    SET nombres = @nombres,
        apellidos = @apellidos,
        contraseña = @contraseña,
        correo = @correo,
        habilitado = @habilitado
    WHERE idProvedor = @idProvedor
    `;
    const parameters = [
        { name: 'idProvedor', type: TYPES.Int, value: idProvedor },
        { name: 'nombres', type: TYPES.VarChar, value: nombres },
        { name: 'apellidos', type: TYPES.VarChar, value: apellidos },
        { name: 'contraseña', type: TYPES.VarChar, value: contraseña },
        { name: 'correo', type: TYPES.VarChar, value: correo },
        { name: 'habilitado', type: TYPES.Char, value: habilitado },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const deleteProvedor = (idProvedor) => {
    const query = `
    DELETE FROM dbo.provedor
    WHERE idProvedor = @idProvedor
    `;
    const parameters = [
        { name: 'idProvedor', type: TYPES.Int, value: idProvedor },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const allProvedores = () => {
    const query = `
    SELECT * FROM dbo.provedor
    `;
    return execQuery.execReadCommand(query);
};

const getByIDProvedor = (idProvedor) => {
    const query = `
    SELECT * FROM dbo.provedor
    WHERE idProvedor = @idProvedor
    `;
    const parameters = [
        { name: 'idProvedor', type: TYPES.Int, value: idProvedor },
    ];
    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    addProvedor,
    updateProvedor,
    deleteProvedor,
    allProvedores,
    getByIDProvedor,
};