import React from "react";
import Note from "./Note";
import "./css/style.css";

function NotesList({notes, onEdit, onDelete}) {
    return (
        <div className="NotesList">
        {notes.map((note, index) => (
        <Note 
          key={index}
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
      </div>
    )
    
}

export default NotesList;