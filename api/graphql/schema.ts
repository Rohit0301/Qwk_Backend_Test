import { makeSchema } from 'nexus';
import { join } from 'path';
// It is considered best practice to pass your types directly from a "star import" like we've done above. Under the hood, Nexus will unwrap the types. This prevents from constantly having to manually export & import every single type of your API.
import * as types from "./types";

export const schema = makeSchema({
    // GraphQL types that will be used to construct your GraphQL schema.
    types,
    outputs: {
        // Output path to where nexus should write the generated TypeScript definition types derived from your schema. This is mandatory to benefit from Nexus' type-safety.
        typegen: join(__dirname, '..', 'nexus-typegen.ts'),
        // Output path to where nexus should write the SDL (schema definition language) version of your GraphQL schema.
        schema: join(__dirname, '..', 'schema.GraphQL'),
    },
    contextType: {
        module: join(process.cwd(), "./api/types/Context.ts"),
        export: "Context",
      },
});