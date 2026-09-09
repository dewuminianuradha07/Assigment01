const request = require('supertest');
const app = require('../server'); // Import the Express app
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

jest.mock('../model/user'); // Mock User model
jest.mock('bcrypt'); // Mock bcrypt
jest.mock('jsonwebtoken'); // Mock jwt

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
  await mongoose.disconnect(); // Disconnect after tests
});

describe('POST /login', () => {
  it('should log in the user with valid credentials', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword123',
    };

    // Mock finding a user by email
    User.findOne.mockResolvedValue(mockUser);

    // Mock bcrypt comparison
    bcrypt.compare.mockResolvedValue(true);

    // Mock JWT sign
    jwt.sign.mockReturnValue('fake-jwt-token');

    const response = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('fake-jwt-token');
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: mockUser.email, name: mockUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should return 400 if the email does not exist', async () => {
    User.findOne.mockResolvedValue(null); // Mock no user found

    const response = await request(app).post('/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 400 if the password is incorrect', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'hashedpassword123',
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false); // Mock password comparison failure

    const response = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'wrongpassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 500 if there is a server error', async () => {
    User.findOne.mockImplementationOnce(() => {
      throw new Error('Server error');
    });

    const response = await request(app).post('/login').send({
      email: 'johndoe@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});
