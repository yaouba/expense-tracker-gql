import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

const resolvers = mergeResolvers([userResolver, transactionResolver]);

export default resolvers;