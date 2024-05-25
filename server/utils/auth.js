const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the correct path to User model

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Custom authentication error
const AuthenticationError = new GraphQLError('Could not authenticate user.', {
  extensions: {
    code: 'UNAUTHENTICATED',
  },
});

// Function to handle authentication and context creation
const authMiddleware = async ({ req }) => {
  let token = req.query.token || req.headers.authorization;
  console.log('Token received:', token);
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return { user: null };
  }

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    const user = await User.findById(data._id);
    return { user };
  } catch (err) {
    console.log('Invalid token', err);
    return { user: null };
  }
};

// Function to sign a new token
const signToken = function ({ username, email, _id }) {
  const payload = { username, email, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = {
  AuthenticationError,
  authMiddleware,
  signToken,
};
