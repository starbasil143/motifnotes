"use server"

import { connect, InferSchemaType, model, Schema } from 'mongoose';
import { Note, NoteSchema } from './schemas';



export async function searchForTrack(query : string | null) {
  const res = await fetch(`http:localhost:3000/api/soundcloud/search?q=${query}`)

  res.json()
  .then (result => {
    return result;
  })
}




export async function createNote(newNote : NoteSchema) {
  await connect(process.env.MONGODB_URI as string);

  const note = await Note.create(newNote);

  return note.id;
}

export async function getNote(noteId: string) {
  await connect(process.env.MONGODB_URI as string);

  const note = await Note.findById(noteId) as NoteSchema;

  return note;
}
