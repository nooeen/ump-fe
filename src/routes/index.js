const express = require('express');
const router = express.Router();

function route(app) {
  
    app.get('/api/greeting', (req, res) => {
        const name = req.query.name || 'World';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    });

    app.get('/', (req, res) => {
        res.send("home")
    });
}

module.exports = route;