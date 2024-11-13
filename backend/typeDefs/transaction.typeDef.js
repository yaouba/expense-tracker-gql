const transactionTypeDef = `#graphql
    type Transaction {
        _id: ID!
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        location: String!
        amount: Int!
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        userId: ID!
        description: String!
        paymentType: String!
        category: String!
        location: String!
        amount: Int!
        date: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        description: String!
        paymentType: String!
        category: String!
        location: String!
        amount: Int!
        date: String!
    }
`