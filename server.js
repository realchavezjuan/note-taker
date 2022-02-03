const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// this function returns the database
const getNotes = () =>{
    const notes = fs.readFileSync('./db/db.json');
    return JSON.parse(notes);
}
// HTML Routes - servers html pages to client
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API Routes - will serve the notes' array of obj
app.get('/api/notes', (req, res) => {
    const notes = getNotes();
    console.log(notes);
    res.json(notes);
});

// POST Route 
app.post('/api/notes', (req, res) => {
    // gets all notes in database
    const notes = getNotes();
    // gets current note 
    const {title, text} = req.body;
    // adds a new id with a Math.random() number
    const newNote = {title, text, id: Math.random()}
    notes.push(newNote);
    // rewrite file
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    // sends single note back
    res.json(note);
});

// DELETE Route
app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id)
    // get all notes from dataabase
    const notes = getNotes();
    // compares the id of all the notes from database with the id of the delete button 
    const updateNotes = notes.filter(note => note.id != req.params.id);
    // rewrite file after note with matching id is filtered out of the array
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(updateNotes, null, 2)
    );
    // send back an ok statement
    res.json({ok: true});
});

// PORT 3001
app.listen(PORT, () => {
    console.log(`api server now on port ${PORT}!`);
});