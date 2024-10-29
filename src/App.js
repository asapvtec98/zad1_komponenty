import React, { useState } from "react";
import "./App.css";
import NotesList from "./components/NotesList";

function App() {
  const [notes, setNotes] = useState([
    { title: "Zakupy", description: "Jajka, Mleko, Sałata" },
    { title: "Dentysta", description: "Dentysta na 12:00 w piątek" },
  ]);
  function handleEdit(oldNote, updatedNote) {
    setNotes(notes.map(note => 
      note === oldNote ? { ...note, ...updatedNote } : note
    ));
  }

  function handleDelete(noteToDelete) {
    setNotes(notes.filter((note) => note !== noteToDelete));
  }

  return (
    <div className="App">
      <h1>Notatki</h1>
      <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete}></NotesList>
    </div>
  );
}

export default App;
