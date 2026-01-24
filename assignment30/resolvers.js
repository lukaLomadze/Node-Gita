import { users, expenses } from "./data.js"

export const resolvers = {

    User: {
        expenses: (parent) => {
            return expenses.filter(e => e.userId === parent.id)
        }
    },

    Expense: {
        user: (parent) => {
            return users.find(u => u.id === parent.userId)
        }
    },

    Query: {
        users: () => users,

        user: (_, { id }) => users.find(u => u.id === Number(id)),

        expenses: () => expenses,

        expense: (_, { id }) => expenses.find(e => e.id === Number(id)),
    },

    Mutation: {
        createUser(_, { createUserInput }) {
            const lastId = users[users.length - 1]?.id || 0
            const newUser = {
                id: lastId + 1,
                ...createUserInput
            }
            users.push(newUser)
            return newUser
        },

        updateUser(_, { id, updateUserInput }) {
            const index = users.findIndex(u => u.id === Number(id))
            if (index === -1) return null

            users[index] = {
                ...users[index],
                ...updateUserInput
            }
            return users[index]
        },

        deleteUser(_, { id }) {
            const index = users.findIndex(u => u.id === Number(id))
            if (index === -1) return null

            return users.splice(index, 1)[0]
        },

       




        
        createExpense(_, { createExpenseInput }) {
            const lastId = expenses[expenses.length - 1]?.id || 0
            const newExpense = {
                id: lastId + 1,
                ...createExpenseInput
            }
            expenses.push(newExpense)
            return newExpense
        },

        updateExpense(_, { id, updateExpenseInput }) {
            const index = expenses.findIndex(e => e.id === Number(id))
            if (index === -1) return null

            expenses[index] = {
                ...expenses[index],
                ...updateExpenseInput
            }
            return expenses[index]
        },

        deleteExpense(_, { id }) {
            const index = expenses.findIndex(e => e.id === Number(id))
            if (index === -1) return null

            return expenses.splice(index, 1)[0]
        }
    }
}
