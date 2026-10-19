const http = require('http');
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/test';

mongoose.connect(mongoUri).then(
    () => console.log('Connected to MongoDB')
).catch(
    (err) => console.error('Error connecting to MongoDB:', err)
);

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from Svelte app!\n');
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
