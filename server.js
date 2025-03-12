const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRoutes);

// For Vercel serverless functions
if (process.env.VERCEL) {
    app.use((req, res, next) => {
        res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
        next();
    });
}

const PORT = process.env.PORT || 3000;

// Use this for local development
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Required for Vercel
module.exports = app;
