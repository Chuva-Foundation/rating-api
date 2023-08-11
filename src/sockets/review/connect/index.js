const Connection = require('models/Connection');

exports.process = async ({ connection_id }) => {
    console.log(connection_id, 'connected');

    await Connection.create({
        connection_id
    });
};
