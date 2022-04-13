const express = require("express");
const path = require("path");
const fs = require("fs");

// set up express
const app = express();
const PORT = process.env.PORT || 8001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('db'));

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
  // return the notes.html file
});

app.get("/api/notes", function(req, res) {
  // display the notes as json
});

app.get("/api/notes/:note", function(req, res) {
  // display a single note
});

// POST
app.post();

// DELETE
app.delete();

// Listening
app.listen(PORT, function(err) {
  if (err) console.log(err);
  console.log("App listening on PORT " + PORT);
});