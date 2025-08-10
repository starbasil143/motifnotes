"use server"

import { connect, InferSchemaType, model, ObjectId, Schema } from 'mongoose';
import { Note, NoteSchema, Quote, QuoteSchema, Motif, MotifSchema, NoteDocument } from './schemas';
import { auth } from '@/auth';



export async function searchForTrack(query : string | null) {
  const res = await fetch(`http:localhost:3000/api/soundcloud/search?q=${query}`)

  res.json()
  .then (result => {
    return result;
  })
}


export async function getUser() { // placeholder idk
  const session = await auth();
  if (!session || !session.user) {
    return null;
  }
  return session.user;
}

export async function createNote(newNote : NoteSchema) {
  await connect(process.env.MONGODB_URI as string);

  const note = await Note.create(newNote);

  console.log('wahoo!')
  console.log(JSON.parse(JSON.stringify(note)));

  return note._id.toString();
}

export async function getNote(id : string) {
  await connect(process.env.MONGODB_URI as string);

  const note = await Note.findById(id);

  return JSON.parse(JSON.stringify(note));
}

export async function getUserNotes(userId : string) {
  await connect(process.env.MONGODB_URI as string);
  const notes = await Note.find({owner: userId})
  return JSON.parse(JSON.stringify(notes)) as NoteDocument[];
}
export async function getPublicNotes() {
  await connect(process.env.MONGODB_URI as string);
  const notes = await Note.find({private: false})
  return JSON.parse(JSON.stringify(notes)) as NoteDocument[];
}

export async function getSoundcloudPlaylist(id : string) {
  fetch(`/api/soundcloud/getPlaylist?q=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data => {
        return JSON.parse(JSON.stringify(data.playlist));
      })
    .catch(e => console.error(e));
}

