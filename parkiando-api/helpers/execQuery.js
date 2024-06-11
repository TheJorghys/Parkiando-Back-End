const getConnection = require('./getConnection');
const { Request } = require('tedious');

const execQuery = (query, parameters, callbackEvent) => {
    console.log('Executing query:', query); // Depuración
    console.log('Parameters:', parameters); // Depuración

    if (typeof query !== 'string') {
        throw new TypeError('The "query" argument must be of type string. Received ' + typeof query);
    }

    if (parameters && !Array.isArray(parameters)) {
        throw new TypeError('The "parameters" argument must be an array. Received ' + typeof parameters);
    }

    const command = new Promise((resolve, reject) => {
        getConnection().connect()
            .then(instance => {
                const request = new Request(query, (error) => {
                    if (error) {
                        reject(error);
                    }
                });

                if (parameters) {
                    parameters.forEach(parameter => {
                        request.addParameter(parameter.name, parameter.type, parameter.value);
                    });
                }

                const close = () => instance.close();

                request.on('error', error => {
                    close();
                    reject(error);
                });

                callbackEvent(request, close, resolve);
                instance.execSql(request); // Asegúrate de que el método es execSql, no execSQL
            })
            .catch(error => {
                console.error('Connection error:', error); // Depuración adicional
                reject(error);
            });
    });
    return command;
};

const execWriteCommand = (query, parameters) => {
    const callbackEvent = (request, close, resolve) => {
        request.on('requestCompleted', (rowCount, more) => {
            close();
            resolve({ rowCount, more });
        });
    };

    return execQuery(query, parameters, callbackEvent);
};

const execReadCommand = (query, parameters = null) => {
    const callbackEvent = (request, close, resolve) => {
        request.on('doneInProc', (rowCount, more, rows) => {
            const responseRows = [];

            if (rows) rows.forEach(row => {
                const currentRow = {};
                if (row) row.forEach(column => {
                    currentRow[column.metadata.colName] = column.value;
                });
                responseRows.push(currentRow);
            });
            resolve(responseRows);
        });

        request.on('requestCompleted', () => close());
    };
    return execQuery(query, parameters, callbackEvent);
};

module.exports = {
    execWriteCommand,
    execReadCommand,
};

