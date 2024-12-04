const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const formRoutes = require('../src/routes/formRoutes');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use('/forms', formRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testFormDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Form Controller Tests', () => {
  test('Should create a new form', async () => {
    const res = await request(app).post('/forms').send({
      name: 'Test Form',
      description: 'This is a test form',
      questions: [
        { text: 'What is your name?', type: 'short', required: true },
      ],
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Form');
  });

  test('Should fail without a form name', async () => {
    const res = await request(app).post('/forms').send({
      description: 'This is a test form',
    });
    expect(res.statusCode).toBe(400);
  });
});
