const { route } = require('@chuva.io/less');
const controller = require('controllers/ratings');
module.exports = {
    post: route(controller.post, [])
}
