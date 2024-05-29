const { User, Session, Conference } = require('../models');
const { signToken } = require('../utils/auth');
const { DateTimeResolver , DateResolver} = require('graphql-scalars');

const resolvers = {
    DateTime: DateTimeResolver,
    Date: DateResolver,
    Query: {
        // me: async (parent, args, context) => {
        //     console.log('Context:', context); // Log the context
        //     if (context.user) {
        //         return User.findOne({ _id: context.user._id });
        //     }
        //     throw AuthenticationError;
        // },
        me: async (parent, args, context) => {
            console.log('Context:', context); // Log the context
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedSessions');
            }
            throw new AuthenticationError('You must be logged in');
        },
        user: async (_, { _id }) => {
            return await User.findById(_id);
        },
        conferences: async (parent, args, context) => {

            return Conference.find();
        },
        conference: async (_, { id }) => {
            return Conference.findById(id);
        },
        sessions: async (parent, args, context) => {

            return Session.find();
        },
        sessionsByConference: async (_, { conferenceId }) => {
            return await Session.find({ conferenceId });
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
        addConference: async (_, { name, description, startDate,endDate,location,image }) => {
            const conference = new Conference({ name, description, startDate, endDate, location, image });
            await conference.save();
            return conference;
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
        saveSession: async (_, { userId, sessionId }, context) => {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            const session = await Session.findById(sessionId);
            if (!session) {
                throw new Error('Session not found');
            }
            // console.log('User before saving session:', user);
            user.savedSessions.push(sessionId);
            await user.save();
            // Populate the savedSessions field
            const populatedUser = await User.findById(userId).populate('savedSessions');
            return populatedUser;

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

        removeSession: async (_, { userId, sessionId }) => {
            try {
                const user = await User.findById(userId);
                if (!user) {
                    console.error('User not found:', userId);
                    throw new Error('User not found');
                }

                user.savedSessions = user.savedSessions.filter(session => session.toString() !== sessionId);
                await user.save();
                const populatedUser = await User.findById(userId).populate('savedSessions');
                console.log('Updated User:', JSON.stringify(populatedUser, null, 2));
                return populatedUser;
            } catch (error) {
                console.error('Resolver Error:', error.message);
                throw new Error('Failed to remove session');
            }
        }
    }
};

module.exports = resolvers;
