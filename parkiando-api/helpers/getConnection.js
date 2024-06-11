const { Connection } = require('tedious');
const dotenv = require('dotenv');

dotenv.config();

const {
    DATABASE_SERVER,
    DATABASE_AUTH_TYPE,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
} = process.env;

const configConnection = {
    server: DATABASE_SERVER,
    authentication: {
        type: DATABASE_AUTH_TYPE,
        options: {
            userName: DATABASE_USERNAME,
            password: DATABASE_PASSWORD, // Asegúrate de que el nombre de la variable sea correcto
        },
    },
    options: {
        encrypt: true,
        database: DATABASE_NAME,
        rowCollectionOnDone: true,
    },
};

const getConnection = () => {
    const connect = () => new Promise((resolve, reject) => {
        const connectionInstance = new Connection(configConnection);
        connectionInstance.on('connect', (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(connectionInstance);
            }
        });

        connectionInstance.connect();
    });

    return { connect };
};

module.exports = getConnection;
