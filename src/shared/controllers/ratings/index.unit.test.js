const { faker } = require('@faker-js/faker')
const controller = require('.')
const Category = require('models/Category');
const Item = require('models/Item');
const Rating = require('models/Rating');

jest.spyOn(Rating, 'create');

const create_category = () => ({
  name: faker.word.adjective(),
  attributes: [
    faker.word.adjective(),
    faker.word.adjective()
  ],
});

const create_item = (category) => {
  const item_attributes = {};

  category.attributes.forEach((attribute) => {
    item_attributes[attribute] = faker.word.adjective();
  });

  return {
    category_id: category.id,
    name: faker.word.adjective(),
    attributes: item_attributes
  };
};

const create_rating = (item) => {
  return {
    item_id: item.id,
    value: faker.datatype.number({ min: 0, max: 100 }),
    comment: faker.lorem.sentence()
  };
};

let mock_rating;

describe('Controller ratings', () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    await Rating.destroy({ where: {}, truncate: true });
    await Item.destroy({ where: {}, truncate: true });
    await Category.destroy({ where: {}, truncate: true });

    // Prepare
    const mock_category = create_category();
    const category = await Category.create(mock_category);
    const mock_item = create_item(category);
    const item = await Item.create(mock_item);
    mock_rating = create_rating(item);
  });

  describe('post', () => {
    describe('Success case', () => {
      it('should create a new rating and return the created rating', async () => {
        // prepare payload
        const req = {
          body: JSON.stringify({
            item_id: mock_rating.item_id,
            value: mock_rating.value,
            comment: mock_rating.comment
          })
        };

        // Act
        const result = await controller.post(req, { body: null });

        // Assert
        expect(JSON.parse(result.body)).toMatchObject(mock_rating);
        expect(Rating.create).toHaveBeenCalledWith(mock_rating);
      });
    });
    describe('Error cases', () => {
      it('return error if item_id is missing', async () => {
        // Prepare
        const expected_error = '"item_id" is required';

        // prepare payload
        const req = {
          body: JSON.stringify({
            value: mock_rating.value,
            comment: mock_rating.comment
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Rating.create).not.toHaveBeenCalled();
      });

      it('return error if value is missing', async () => {
        // Prepare
        const expected_error = '"value" is required';

        // prepare payload
        const req = {
          body: JSON.stringify({
            item_id: mock_rating.item_id,
            comment: mock_rating.comment
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Rating.create).not.toHaveBeenCalled();
      });

      it('return error if comment is missing', async () => {
        // Prepare
        const expected_error = '"comment" is required';

        // prepare payload
        const req = {
          body: JSON.stringify({
            item_id: mock_rating.item_id,
            value: mock_rating.value
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Rating.create).not.toHaveBeenCalled();
      });

      it('return error when invalid request body is provided', async () => {
        // Prepare
        const expected_error = '"invalid_property" is not allowed';
        // prepare payload
        const req = {
          body: JSON.stringify({
            item_id: mock_rating.item_id,
            value: mock_rating.value,
            comment: mock_rating.comment,
            invalid_property: mock_rating.comment
          })
        };

        // Assert
        await expect(async () => {
          await controller.post(req, { body: null });
        }).rejects.toThrow(expected_error);
        expect(Rating.create).not.toHaveBeenCalled();
      });
    });
  });
});
