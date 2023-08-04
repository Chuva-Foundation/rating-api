const { route } = require('@chuva.io/less');
const controller = require('controllers/items');
module.exports = {
    get: route(controller.get_by_id, [])
}
