import {Schema, model, InferSchemaType, models} from 'mongoose';

const noteSchema = new Schema({
  title: {type: String, required: true},
  playlistId: {type: String, required:true}
})

export const Note = models.Note || model('Note', noteSchema)
export type NoteSchema = InferSchemaType<typeof noteSchema>;