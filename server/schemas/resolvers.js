const { User, Session, Conference } = require('../models');
const { signToken } = require('../utils/auth');
const { DateTimeResolver, DateResolver } = require('graphql-scalars');

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
        user: async (_, { id }) => {
            console.log("id: " + id);
            return await User.findById(id);
        },
        users: async () => {
            return await User.find();
        },
        conferences: async (parent, args, context) => {

            return Conference.find();
        },
        conference: async (_, { id }) => {
            return Conference.findById(id);
        },
        sessions: async () => {
            return await Session.find().populate('users');
        },
        sessionsByConference: async (parent, { conferenceId }, context) => {
            return await Session.find({ conferenceId }).populate('users');
        },
    },

    Session: {
        userCount: async (parent) => {
            const session = await Session.findById(parent._id).populate('users');
            console.log('Session User Count:', parent.users.length); // Add this to debug
            return session.users.length;
        }
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
            user.isAdmin = false;
            user.getSMSReminders = false;
            user.getEmailReminders = false;
            await user.save();
            const token = signToken(user);
            return { token, user };
        },
        saveUser: async (_, { username, email, getEmailReminders, getSMSReminders }) => {
            const filter = { username: username};
            const update = {
                getEmailReminders: getEmailReminders,
                getSMSReminders: getSMSReminders
            }
            const user = await User.findOneAndUpdate(filter,update);
            if (!user) {
                throw new Error('User not updated');
            }
            console.log("Updated user:" + user);
            // user.email = email;
            // user.getEmailReminders = getEmailReminders;
            // user.getSMSReminders = getSMSReminders;
            //console.log("User to save: " + user);
            
            return user;

        },
        addConference: async (_, { name, description, startDate, endDate, location, image }) => {
            const conference = new Conference({ name, description, startDate, endDate, location, image });
            await conference.save();
            return conference;
        },
        createSession: async (_, { name, description, date, time, presenters, duration,
            room, conferenceId }) => {
            const session = new Session({
                name, description, date, time, presenters, duration,
                room, conferenceId
            });
            await session.save();
            return session;
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

            // Add the session ID to the user's savedSessions if it isn't already there
            if (!user.savedSessions.includes(sessionId)) {
                user.savedSessions.push(sessionId);
            }
            // Add the user ID to the session's users if it isn't already there
            if (!session.users.includes(userId)) {
                session.users.push(userId);
            }
            // Save both documents
            await user.save();
            await session.save();

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

                const session = await Session.findById(sessionId);
                if (!session) {
                    throw new Error('Session not found');
                }

                // Filter out the sessionId from user's savedSessions
                user.savedSessions = user.savedSessions.filter(session => session.toString() !== sessionId);

                // Filter out the userId from session's users
                session.users = session.users.filter(user => user.toString() !== userId);

                await user.save();
                await session.save();

                // Populate the savedSessions field
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