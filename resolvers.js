const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { firstName, lastName, email } = user;
    return jwt.sign({ firstName, lastName, email }, secret, { expiresIn })
}


exports.resolvers = {
    Query: {

        //admin queries
        getAllCategories: async (root, args, { Category }) => {
            const allCategories = await Category.find();
            return allCategories;
        },

        getAllProducts: async (root, args, { Product }) => {
            const allProducts = await Product.find();
            return allProducts;
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }
            const user = await User.findOne({ email: currentUser.email })
                .populate({
                    path: 'favorites',
                    model: 'Product'
                });
            return user;
        },
    },
    Mutation: {
        // user mutations
        signin: async (root, { email, password }, { User }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid password');
            }
            user.token = createToken(user, process.env.SECRET, "1hr");
            return user;
        },

        signup: async (root, { firstName, lastName, email, password }, { User }) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                firstName,
                lastName,
                email,
                password
            }).save();
            return { token: createToken(newUser, process.env.SECRET, "1hr") };
        },

        // // admin mutations
        // signinAdmin: async (root, { username, password }, { Admin }) => {
        //     const admin = await Admin.findOne({ username });
        //     if (!admin) {
        //         throw new Error('Admin not found');
        //     }
        //     const isValidPassword = await bcrypt.compare(password, admin.password);
        //     if (!isValidPassword) {
        //         throw new Error('Invalid password');
        //     }
        //     return { token: createTokenAdmin(admin, process.env.SECRET, "1hr") };
        // },

        // signupAdmin: async (root, { username, email, password }, { Admin }) => {
        //     const admin = await new Admin({
        //         username,
        //         email,
        //         password
        //     }).save();
        //     return { token: createTokenAdmin(admin, process.env.SECRET, "1hr") };
        // },

        //  signoutAdmin: async () => {

        //  },

        // Category

        addCategory: async (root, { name, product }, { Category }) => {
            const newCategory = await new Category({
                name,
                product
            }).save();
            return newCategory;
        },

        // updateCategory: async () => {

        // },

        // deleteCategory: async () => {

        // },

        // Product 

        addProduct: async (root, { name, description, category, instruction, username }, { Product }) => {
            const newProduct = await new Product({
                name,
                description,
                category,
                instruction,
                username
            }).save();
            return newProduct;
        }

        // updateProduct: async () => {

        // },

        // deleteProduct: async () => {

        // }
    }
}