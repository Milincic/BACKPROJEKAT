const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const collaborationRoutes = require('./routes/collaborationRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/collaborations', collaborationRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Collaboration service running on port ${PORT}`));
