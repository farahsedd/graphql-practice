import { createSchema } from "graphql-yoga";
import { Query } from "./resolver/Query";
import { Cv } from "./resolver/Cv";
import { Mutation } from "./mutation/mutation";
import { Subscription } from "./subscription/subscription";
const fs = require("fs");
const path = require("path");

export const schema = createSchema({
    typeDefs: fs.readFileSync(
        path.join(__dirname, "schema/schema.graphql"),
        "utf-8"
    ),
    resolvers: {
        Query,
        Cv,
        Mutation,
        Subscription
    },
});
