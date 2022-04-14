const express = require("express");
const path = require("path");
const fs = require("fs");
const { response } = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('db'));
app.use(express.static('routes'));

module.exports = (app) => {
  
    app.get("/api/notes", (req, res) => {
        
        let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
           
        res.json(savedNotes);
    });
  
  
    app.post("/api/notes", (req, res) => {
  
        let newNotes = req.body;
        
        newNotes.id = uuidv4();
  
        let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        notesData.push(newNotes);
  
        fs.writeFileSync('./db/db.json', JSON.stringify(notesData));
        
        res.json(notesData);
    });
  
  
    app.delete("/api/notes/:id", (req, res) => {
  
        let noteId = req.params.id;
  
        let notesData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  
        let newSet = notesData.filter( note => note.id !== noteId );
  
        fs.writeFileSync('./db/db.json', JSON.stringify(newSet));
  
        res.json(newSet);
    });
  };