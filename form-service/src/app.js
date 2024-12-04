const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const formRoutes = require('./routes/formRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/forms', formRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Form service running on port ${PORT}`));
