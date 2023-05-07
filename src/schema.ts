import { createSchema } from "graphql-yoga";
import { Query } from "./resolver/Query";
const fs = require("fs");
const path = require("path");

export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "schema/schema.graphql"),
        "utf-8"
    ),
    resolvers: {
        Query
    },
});
