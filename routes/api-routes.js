const express = require("express");
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('db'));
app.use(express.static('routes'));

module.exports = function(app) {
  app.get('/api/notes', function (req, res) {
    return response.json(JSON.parse(fs.readFileSync('../db/db.json')));
  });
  app.post('/api/notes', function(req, res) {
    let newNote = req.body;
    let dbNotes = JSON.parse(fs.readFileSync('../db/db.json'));
    let id = 1;
    while(dbNotes.some(function(value, index) {
      return value.id === id
    })) {
      id++
    }
    newNote.id = id;
    dbNotes.push(newNote);
    fs.writeFileSync('../db/db.json', JSON.stringify(dbNotes));
    res.json(newNote);
  });
  app.delete('/api/notes/:id', function(req, res) {
    let dbNotes = JSON.parse(fs.readFileSync('../db/db.json'));
    let id = parseInt(req.params.id);
    dbNotes = dbNotes.filter(function(note) {
      return note.id !== id
    });
    fs.writeFileSync('../db/db.json', JSON.stringify(dbNotes));
    res.json(dbNotes);
  });
}