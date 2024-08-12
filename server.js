const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Les notater fra JSON-fil
const readNotes = () => {
    const data = fs.readFileSync('notes.json', 'utf-8');
    return JSON.parse(data);
};

// Skriv notater til JSON-fil
const writeNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2), 'utf-8');
};

// Endepunkt for å hente et tilfeldig notat
app.get('/get_random_note', (req, res) => {
    const notes = readNotes();
    if (notes.length > 0) {
        const randomIndex = Math.floor(Math.random() * notes.length);
        res.json({ note: notes[randomIndex] });
    } else {
        res.json({ note: "No notes available." });
    }
});

// Endepunkt for å legge til et nytt notat
app.post('/add_note', (req, res) => {
    const notes = readNotes();
    const newNote = req.body.content;
    notes.push(newNote);
    writeNotes(notes);
    res.json({ message: "Note added successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
