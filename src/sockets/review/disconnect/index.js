const Connection = require('models/Connection');

exports.process = async ({ connection_id }) => {
    console.log(connection_id, 'disconnected');

    await Connection.destroy({
        where: { connection_id }
    });
};
