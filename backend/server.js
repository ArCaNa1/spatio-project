const express = require('express');
const cors = require('cors'); 
const app = express();
const port = 3000;
const path = require('path');

app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.send('Spatio-View API Service v1.0');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/log', (req, res) => {
  console.log(`[INFO] API Log triggered at ${new Date().toLocaleString()}`);
  res.send('Log printed to server console');
});

app.get('/crash', (req, res) => {
  console.log('Server is crashing');
  setTimeout(() => {
    process.exit(1);
  }, 1000);
  res.send('Server is crashing for testing purpose.');
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
