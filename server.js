const express = require('express');
const path = require('path');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Auth routes
app.use('/auth', authRoutes);

// Handle all other routes for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Required for Vercel
module.exports = app;

// Start server if not on Vercel
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
