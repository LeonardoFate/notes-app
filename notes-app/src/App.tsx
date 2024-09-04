import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Note = {
  _id: string;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Función para obtener todas las notas desde el servidor
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Obtener las notas al cargar el componente
  useEffect(() => {
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) return;

    const updatedNote = {
      _id: selectedNote._id,
      title: title,
      content: content,
    };

    try {
      await axios.put(`http://localhost:5000/api/notes/${selectedNote._id}`, updatedNote);
      const updatedNoteList = notes.map((note) =>
        note._id === selectedNote._id ? updatedNote : note
      );
      setNotes(updatedNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, noteId: string) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      const updatedNotes = notes.filter((note) => note._id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    const newNote = {
      title: title,
      content: content,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/notes", newNote);
      setNotes([response.data, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="app-container">
      <form
        onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
        className="notes-form"
      >
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note._id} className="notes-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note._id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
