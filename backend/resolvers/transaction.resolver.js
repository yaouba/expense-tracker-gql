
import Transaction from '../models/transaction.model.js'

const transactionResolver = {
    Query: {
        transactions: async (_, _, context) => {
            try {
                const user = await context.getUser()
                if (!user) {
                    throw new Error('Unauthorized')
                }

                const transactions = await Transaction.find({ userId: user._id })

                return transactions


            } catch (error) {
                console.log('Error getting transactions: ', error);
                throw new Error(error.message || "Internal server error")
            }
        },
        transaction: async (_, { transactionId }) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (error) {
                console.log('Error getting transaction: ', error);
                throw new Error(error.message || "Internal server error")
            }
        },
    },
    Mutation: {
        createTransactcion: async (_, { input }, context) => {
            try {
                
                const newTransaction = new Transaction({
                    ...input,
                    userId: context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction;
            } catch (err) {
                console.log('Error creating transaction: ', err);
                throw new Error(err.message || "Internal server error")
            }
        },
        updateTransaction: async (_, { input }) => {
            try {
                const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, { ...input }, { new: true });
                return updatedTransaction;
            } catch (err) {
                console.log('Error updating transaction: ', err);
                throw new Error(err.message || "Internal server error")
            }
        },
        deleteTransaction: async (_, { transactionId }) => {
            try {
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (err) {
                console.log('Error deleting transaction: ', err);
                throw new Error(err.message || "Internal server error")
            }
        },
    }
}

export default transactionResolver