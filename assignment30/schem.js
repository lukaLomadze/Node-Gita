export const typeDefs = `#graphql

    type User {
        id: ID!
        fullName: String
        age: Int
        isSmoker: Boolean
        expenses: [Expense]
    }

    type Expense {
        id: ID!
        title: String
        amount: Float
        user: User
    }

    type Query {
        users: [User]
        user(id: ID!): User
        expenses: [Expense]
        expense(id: ID!): Expense
    }

    input CreateUserInput {
        fullName: String
        age: Int
        isSmoker: Boolean
    }

    input UpdateUserInput {
        fullName: String
        age: Int
        isSmoker: Boolean
    }

    input CreateExpenseInput {
        title: String
        amount: Float
        userId: ID!
    }

    input UpdateExpenseInput {
        title: String
        amount: Float
    }

    type Mutation {
        createUser(createUserInput: CreateUserInput!): User
        updateUser(id: ID!, updateUserInput: UpdateUserInput): User
        deleteUser(id: ID!): User

        createExpense(createExpenseInput: CreateExpenseInput!): Expense
        updateExpense(id: ID!, updateExpenseInput: UpdateExpenseInput): Expense
        deleteExpense(id: ID!): Expense
    }
`
