const request = require('supertest');
const app = require('../server');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

jest.mock('../model/user'); // Mock User model

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.TEST_DB_URI || 'mongodb://localhost:27017/test';
    await mongoose.connect(uri);
  }
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase(); // Clean up the test database
  }
  await mongoose.disconnect(); // Ensure the connection is closed after tests
});

describe('POST /signup', () => {
  it('should create a new user when the email does not exist', async () => {
    User.findOne.mockResolvedValue(null); // Mock no existing user
    bcrypt.hash = jest.fn().mockResolvedValue('hashedpassword123'); // Mock password hash

    const response = await request(app).post('/signup').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.prototype.save).toHaveBeenCalled();
  });

  it('should return 400 if the user already exists', async () => {
    User.findOne.mockResolvedValue({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'hashedpassword123',
    });

    const response = await request(app).post('/signup').send({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should return 500 if there is a server error', async () => {
    User.findOne.mockImplementationOnce(() => {
      throw new Error('Server error');
    });

    const response = await request(app).post('/signup').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
