const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
const authRoutes = require('../src/routes/authRoutes');


// Set up Express app
const app = express();
app.use(bodyParser.json());
app.use('/auth', authRoutes);


// Mock database connection
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testAuthDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany(); // Clear existing users
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Controller Tests', () => {

  process.env.JWT_SECRET = 'testsecret';

  describe('Register', () => {
    test('Should register a new user successfully', async () => {
      const res = await request(app).post('/auth/register').send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');

      const user = await User.findOne({ email: 'testuser@example.com' });
      expect(user).not.toBeNull();
      expect(user.username).toBe('testuser');
    });

    test('Should not register a user with an existing email', async () => {
      await request(app).post('/auth/register').send({
        username: 'newuser',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/auth/register').send({
        username: 'duplicateuser',
        email: 'test@example.com',
        password: 'password456',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('User with this email already exists');
    });

    test('Should fail when required fields are missing', async () => {
      const res = await request(app).post('/auth/register').send({
        username: 'missingfields',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('email');
    });
  });

  describe('Login', () => {
    test('Should log in a user with valid credentials', async () => {
      await request(app).post('/auth/register').send({
        username: 'loginuser',
        email: 'login@example.com',
        password: 'password123', // aplikacija će sama hesovati lozinku
      });
    
      const res = await request(app).post('/auth/login').send({
        email: 'login@example.com',
        password: 'password123',
      });
    
      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
    
      const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);
      expect(decoded).toHaveProperty('id');
    });

    test('Should not log in a user with invalid credentials', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'login@example.com',
        password: 'wrongpassword',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });

    test('Should fail when email or password is missing', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'login@example.com',
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('Email and password are required');
    });
  });
});
