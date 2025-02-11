const express = require('express');
const app = express();
const path = require('path');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Route for the Future events page
app.get('/theFuture', (req, res) => {
    res.render('theFuture/thefuture'); // This serves views/theFuture/thefuture.ejs
});

app.get('/prehistoricEra', (req, res) => {
    res.render('prehistoricEra/prehistoricEra'); // This serves views/theFuture/thefuture.ejs
});

app.get('/medievalTimes', (req, res) => {
    res.render('medievalTimes/medievalTimes'); // This serves views/theFuture/thefuture.ejs
});

app.get('/formRegistration', (req, res) => {
    res.render('formRegistration/formRegistration'); // This serves views/formRegistration.ejs
});

app.get('/eventLocation', (req, res) => {
    res.render('eventLocation/eventLocation'); // This serves views/formRegistration.ejs
});

app.get('/gallery', (req, res) => {
    res.render('gallery/gallery'); // This serves views/formRegistration.ejs
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
