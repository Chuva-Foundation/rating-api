const { sockets } = require('@chuva.io/less');
const Connection = require('models/Connection');

exports.process = async (rating) => {
    const connections = await Connection.findAll();

    const connection_ids = connections.map(connection => connection.connection_id);

    await sockets.review.publish(rating, connection_ids);
};
