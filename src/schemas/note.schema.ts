import { GraphQLObjectType, GraphQLString } from "graphql";

const NoteSchema = new GraphQLObjectType({
    name: 'Note',
    fields: {
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        content: { type: GraphQLString }
    }
})

export default NoteSchema;