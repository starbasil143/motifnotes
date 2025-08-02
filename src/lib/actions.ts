"use server"

import { connect, InferSchemaType, model, ObjectId, Schema } from 'mongoose';
import { Note, NoteSchema, User, UserSchema, Quote, QuoteSchema, Motif, MotifSchema } from './schemas';



export async function searchForTrack(query : string | null) {
  const res = await fetch(`http:localhost:3000/api/soundcloud/search?q=${query}`)

  res.json()
  .then (result => {
    return result;
  })
}


export async function createUser(username : string){
  await connect(process.env.MONGODB_URI as string);
  const user = await User.create({username: username})
}

export async function getUser() { // placeholder idk
  await connect (process.env.MONGODB_URI as string);
  const user = await User.findOne();
  return JSON.parse(JSON.stringify(user));
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
  return JSON.parse(JSON.stringify(notes));
}

export async function getSoundcloudPlaylist(id : string) {
  fetch(`/api/soundcloud/getPlaylist?q=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data => {
        return JSON.parse(JSON.stringify(data.playlist));
      })
    .catch(e => console.error(e));
}

