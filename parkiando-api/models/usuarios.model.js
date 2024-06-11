const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addUser = (userData) => {
    const { nombre, apellido, correo, contraseña, habilitado } = userData;
    const query = `
    INSERT INTO dbo.usuario (nombre, apellido, correo, contraseña, habilitado)
    VALUES (@nombre, @apellido, @correo, @contraseña, @habilitado)
    `;
    const parameters = [
        { name: 'nombre', type: TYPES.VarChar, value: nombre },
        { name: 'apellido', type: TYPES.VarChar, value: apellido },
        { name: 'correo', type: TYPES.VarChar, value: correo },
        { name: 'contraseña', type: TYPES.VarChar, value: contraseña },
        { name: 'habilitado', type: TYPES.Char, value: habilitado },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const updateUser = (userData) => {
    const { idusuario, nombre, apellido, correo, contraseña, habilitado } = userData;
    const query = `
    UPDATE dbo.usuario
    SET nombre = @nombre,
        apellido = @apellido,
        correo = @correo,
        contraseña = @contraseña,
        habilitado = @habilitado
    WHERE idusuario = @idusuario
    `;
    const parameters = [
        { name: 'idusuario', type: TYPES.Int, value: idusuario },
        { name: 'nombre', type: TYPES.VarChar, value: nombre },
        { name: 'apellido', type: TYPES.VarChar, value: apellido },
        { name: 'correo', type: TYPES.VarChar, value: correo },
        { name: 'contraseña', type: TYPES.VarChar, value: contraseña },
        { name: 'habilitado', type: TYPES.Char, value: habilitado },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const deleteUser = (idusuario) => {
    const query = `
    DELETE FROM dbo.usuario
    WHERE idusuario = @idusuario
    `;
    const parameters = [
        { name: 'idusuario', type: TYPES.Int, value: idusuario },
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const allUsers = () => {
    const query = `
    SELECT * FROM dbo.usuario
    `;
    return execQuery.execReadCommand(query);
};

const getByIDUser = (idusuario) => {
    const query = `
    SELECT * FROM dbo.usuario
    WHERE idusuario = @idusuario
    `;
    const parameters = [
        { name: 'idusuario', type: TYPES.Int, value: idusuario },
    ];
    return execQuery.execReadCommand(query, parameters);
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    allUsers,
    getByIDUser,
};
