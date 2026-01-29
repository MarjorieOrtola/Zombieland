import { getByCategory } from './yourControllerFile.js';
import { Activity } from '../models/Activity.js';
import { Category } from '../models/Category.js';

// On va moquer Activity.findAll
jest.mock('../models/Activity.js', () => ({
  Activity: {
    findAll: jest.fn(),
  },
}));

describe('getByCategory', () => {
  let req, res;

  beforeEach(() => {
    // Mock de req.params
    req = { params: { category: 'Sports' } };

    // Mock de res.json
    res = { json: jest.fn() };

    // Reset des mocks avant chaque test
    Activity.findAll.mockReset();
  });

  it('should call Activity.findAll with the correct include', async () => {
    // Arrange : données factices retournées par findAll
    const fakeActivities = [
      { id: 1, name: 'Football', category: { name: 'Sports' } },
      { id: 2, name: 'Basketball', category: { name: 'Sports' } },
    ];
    Activity.findAll.mockResolvedValue(fakeActivities);

    // Act
    await getByCategory(req, res);

    // Assert
    expect(Activity.findAll).toHaveBeenCalledWith({
      include: {
        model: Category,
        as: 'category',
        where: { name: 'Sports' },
      },
    });

    expect(res.json).toHaveBeenCalledWith(fakeActivities);
  });

  it('should return an empty array if no activities found', async () => {
    Activity.findAll.mockResolvedValue([]);

    await getByCategory(req, res);

    expect(res.json).toHaveBeenCalledWith([]);
  });
});