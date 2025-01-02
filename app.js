import express from "express";
import { getNotes, getNote, createNote } from "./database.js";

const app = express();
app.use(express.json());

app.get("/notes", async (req, res) => {
  const notes = await getNotes();
  res.send(notes);
});

app.get("/note/:id", async (req, res) => {
  const noteId = req.params.id;
  const notes = await getNote(noteId);
  res.send(notes);
});

app.post("/create-note", async (req, res) => {
  const { title, contents } = req.body;
  const note = await createNote(title, contents);
  res.status(201).send(note);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
