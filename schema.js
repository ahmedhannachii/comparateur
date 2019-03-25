exports.typeDefs = `

type Product {
    id: ID
    name: String!
    category: String!
    description: String!
    instruction: String!
    createDate: String
    likes: Int
    username: String
}

 input ProductInput {
    name: String!
    category: String!
    description: String!
    instruction: String!
    username: String
 }

type Category {
    id: ID
    name: String!
    product: String!
}

type User {
    id: ID
    firstName: String!
    lastName: String!
    password: String!
    email: String! @unique
    jointDate: String
    favorites: [Product]
    token: String
    permission: String!
}

type Query {
    getAllProducts: [Product]
    getAllCategories: [Category]
    getCurrentUser: User
}


type Mutation{
    addProduct (input: ProductInput!): Product
    addCategory (name: String!, product: String!): Category
    signin(email: String!, password: String!): User
    signup(firstName:String!, lastName:String!, email:String! , password:String!) : User
}

` ;


