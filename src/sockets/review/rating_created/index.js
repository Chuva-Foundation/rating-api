const { sockets } = require('@chuva.io/less');

exports.process = async ({ data, connection_id }) => {
    await sockets.review.publish(data, [connection_id]);
};
