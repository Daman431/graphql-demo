import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import NoteSchema from "./note.schema";
import { createNote, db, deleteNoteById, findNoteById, updateNote } from "../db/helpers";

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getNotes: {
            type: new GraphQLList(NoteSchema),
            resolve: () => {
                console.log(db);
                return db;
            }
        },
        getNoteById: {
            type: NoteSchema,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => findNoteById(args.id)
        },
        createNote: {
            type: NoteSchema,
            args: {
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return createNote(args.title, args.content);
            }
        },
        updateNote: {
            type: NoteSchema,
            args: {
                id: { type: GraphQLString },
                title: { type: GraphQLString },
                content: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return updateNote(args.id, args.title, args.content);
            }
        },
        deleteNoteById: {
            type: NoteSchema,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                return deleteNoteById(args.id);
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: rootQuery
})

export default schema;