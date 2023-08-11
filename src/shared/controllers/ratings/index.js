const Rating = require('models/Rating');
const schema = require('./schema');
const { topics } = require('@chuva.io/less');

const post = async (req, res) => {
    const body = JSON.parse(req.body);

    const { error } = schema.validate(body);
    if (error) {
        throw error;
    }

    const response = await Rating.create(body);
    const rating = response.get();

    res.body = JSON.stringify(rating);

    await topics.rating_created.publish({
        rating
    });

    return res;
};

module.exports = {
    post
}
