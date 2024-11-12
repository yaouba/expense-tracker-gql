import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";

const resolvers = mergeResolvers([userResolver]);

export default resolvers;