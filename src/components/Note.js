import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import "./css/style.css";

function Note({ note, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    description: note.description,
  });

  function handleModalOpen(event) {
    event.stopPropagation();
    setEditedNote({ title: note.title, description: note.description });
    setOpen(true);
  }

  function handleModalClose(event) {
    event.stopPropagation();
    setOpen(false);
    setIsEditing(false);
  }

  function handleDelete(event) {
    event.stopPropagation();
    onDelete(note);
  }

  function startEditing(event) {
    event.stopPropagation();
    setIsEditing(true);
  }

  function saveEdit(event) {
    event.stopPropagation();
    onEdit(note, editedNote);
    setIsEditing(false);
    setOpen(false);
  }

  function cancelEdit(event) {
    event.stopPropagation();
    setEditedNote({ title: note.title, description: note.description });
    setIsEditing(false);
  }

  return (
    <div
      role="button"
      data-dialog-target="modal"
      onClick={handleModalOpen}
      className="Note text-slate-800 flex w-full items-center rounded-md p-2 pl-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 "
    >
      <h2>{note.title}</h2>

      {/* Dialog (modal) */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="Note relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedNote.title}
                          onChange={(e) =>
                            setEditedNote({
                              ...editedNote,
                              title: e.target.value,
                            })
                          }
                          className="w-full border px-2 py-1 rounded-md"
                        />
                      ) : (
                        note.title
                      )}
                    </DialogTitle>
                    <div className="mt-2">
                      {isEditing ? (
                        <textarea
                          value={editedNote.description}
                          onChange={(e) =>
                            setEditedNote({
                              ...editedNote,
                              description: e.target.value,
                            })
                          }
                          className="w-full border px-2 py-1 rounded-md"
                        />
                      ) : (
                        <p className="text-sm text-gray-500">{note.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      data-autofocus
                      onClick={saveEdit}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      data-autofocus
                      onClick={cancelEdit}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel editing
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={startEditing}
                      className="ml-3 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      type="button"
                    >
                      <svg
                        className="w-6 h-6 text-gray-800"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      data-autofocus
                      onClick={handleModalClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Close
                    </button>
                  </>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Przyciski akcji (Usuń) */}
      <div className="z-10 ml-auto grid place-items-center justify-self-end">
        <button
          onClick={handleDelete}
          className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Note;
