import express from "express";
import { getNotes, getNote, createNote, updateNote } from "./database.js";

const app = express();
app.use(express.json());

app.get("/notes", async (req, res) => {
  try {
    const notes = await getNotes();
    res.send(notes);
  } catch (error) {
    res.status(500).send({ error: `Failed to get notes: ${error.message}` });
  }
});

app.get("/note/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await getNote(noteId);
    if (note) {
      res.send(note);
    } else {
      res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).send({ error: `Failed to get note: ${error.message}` });
  }
});

app.post("/create-note", async (req, res) => {
  try {
    const { title, contents } = req.body;
    const note = await createNote(title, contents);
    res.status(201).send(note);
  } catch (error) {
    res.status(500).send({ error: `Failed to create note: ${error.message}` });
  }
});

app.put("/update-note/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, contents } = req.body;
    const note = await updateNote(noteId, title, contents);
    if (note) {
      res.send(note);
    } else {
      res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    res.status(500).send({ error: `Failed to update note: ${error.message}` });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
