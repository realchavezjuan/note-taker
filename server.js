const express = require('express');
const { notes } = require('./db/db.json');
const { addNoteToDataBase } = require('./public/assets/js/index');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');

// Middleware
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


// HTML Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const note = req.body;
    console.log(note);
    const test = addNoteToDataBase(note);
});

// PORT 3001
app.listen(PORT, () => {
    console.log(`api server now on port ${PORT}!`);

});