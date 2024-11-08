const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');

dotenv.config({path: '../vars/.env'});
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));