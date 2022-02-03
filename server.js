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

// API Routes - will serve the notes' object in a page to the client
app.get('/api/notes', (req, res) => {
    const notes = getNotes();
    console.log(notes);
    res.json(notes);
});

// POST Route 
app.post('/api/notes', (req, res) => {
    const notes = getNotes();
    const {title, text} = req.body;
    const newNote = {title, text, id: Math.random()}
    notes.push(newNote);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    res.json(note);
    //const test = addNoteToDataBase(note);
});

// DELETE Route
app.delete('/api/notes/:id', (req, res) => {
    console.log(req.params.id)
    const notes = getNotes();
    const updateNotes = notes.filter(note => note.id != req.params.id);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(updateNotes, null, 2)
    );
    res.json({ok: true});
});

// PORT 3001
app.listen(PORT, () => {
    console.log(`api server now on port ${PORT}!`);
});