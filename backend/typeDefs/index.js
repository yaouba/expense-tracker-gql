import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef.js";

const typeDefs = mergeTypeDefs([userTypeDef]);

export default typeDefs;