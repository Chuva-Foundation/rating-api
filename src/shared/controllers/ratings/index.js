const Rating = require('models/Rating');
const schema = require('./schema');

const post = async (req, res) => {
    const body = JSON.parse(req.body);

    const { error } = schema.validate(body);
    if (error) {
        throw error;
    }

    const rating = await Rating.create(body);
    res.body = JSON.stringify(rating.get());
    return res;
};

module.exports = {
    post
}
