import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { ObjectId } from 'mongodb'; //'ObjectId' para manejar IDs correctamente
import dotenv from "dotenv";
dotenv.config();
const mongoUri = process.env.MONGO_URI || ""; // Proporcionar un valor predeterminado en caso de undefined


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(mongoUri, {
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

// Definir el esquema de las notas
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

// Obtener todas las notas
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Crear una nueva nota
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Actualizar una nota
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Convertir el id a ObjectId usando 'new'
    const updatedNote = await Note.findByIdAndUpdate(new ObjectId(id), { title, content }, { new: true });
    
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Eliminar una nota
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Convertir el id a ObjectId usando 'new'
    const deletedNote = await Note.findByIdAndDelete(new ObjectId(id));
    
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
