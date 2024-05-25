const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            console.log('Context:', context); // Log the context
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },
        user: async (_, { _id }) => {
            return await User.findById(_id);
        },
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error("Can't find this user");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (_, { username, email, password }) => {
            const user = new User({ username, email, password });
            await user.save();
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (_, { userId, book }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.savedBooks.push(book);
            await user.save();
            return user;
        },
        removeBook: async (_, { userId, bookId }) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            user.savedBooks = user.savedBooks.filter(book => book.bookId !== bookId);
            await user.save();
            return user;
        },
    }
};

module.exports = resolvers;
