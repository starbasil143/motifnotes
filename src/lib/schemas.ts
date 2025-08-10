import {Schema, model, InferSchemaType, models, SchemaTypes, HydratedDocument, HydratedDocumentFromSchema} from 'mongoose';


const noteSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  playlistId: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },

  motifs: [{
    type: SchemaTypes.ObjectId,
    ref: "Motif",
  }],

  private: {
    type: Boolean,
    default: false
  }



})
export const Note = models.Note || model('Note', noteSchema)
export type NoteSchema = InferSchemaType<typeof noteSchema>;

export type NoteDocument = HydratedDocumentFromSchema<typeof noteSchema>;


const motifSchema = new Schema ({
  name: {
    type: String,
    required: true,
    default: "Motif"
  },

  quotes: [{
    type: SchemaTypes.ObjectId,
    ref:"Quote"
  }],

  note: {
    type: SchemaTypes.ObjectId,
    ref: "Note",
    required: true
  },
})
export const Motif = models.Motif || model('Motif', motifSchema)
export type MotifSchema = InferSchemaType<typeof motifSchema>;

const quoteSchema = new Schema ({
  startTime: {
    type: Number
  },
  endTime: {
    type: Number
  },
  track: {
    type: String,
    required: true
  },
  motif: {
    type: SchemaTypes.ObjectId,
    ref: "Motif",
  }
})
export const Quote = models.Quote || model('Quote', quoteSchema)
export type QuoteSchema = InferSchemaType<typeof quoteSchema>;


// const userSchema = new Schema ({
//   username: {
//     type: String,
//     required: true
//   },
//   notes: [{
//     type: SchemaTypes.ObjectId,
//     ref: "Note"
//   }]
// })
// export const User = models.User || model('User', userSchema)
// export type UserSchema = InferSchemaType<typeof userSchema>;


