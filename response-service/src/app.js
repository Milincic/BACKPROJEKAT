const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const responseRoutes = require('./routes/responseRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/responses', responseRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Response service running on port ${PORT}`));
