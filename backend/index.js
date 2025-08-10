
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('./generated/prisma');

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('BPO OS Backend is running!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
