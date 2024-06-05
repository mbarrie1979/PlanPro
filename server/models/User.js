const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const bookSchema = require('./Book');
const Session = require('./Session');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    savedSessions: [{
      type: Schema.Types.ObjectId,
      ref: 'Session',
    }],
    isAdmin: {
      type: Boolean,
    },
    getEmailReminders: {
      type: Boolean,
    },
    getSMSReminders: {
      type: Boolean,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],
    
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

const User = model('User', userSchema);

// const query = { username: "testuser" };
// const update = { $set: { 
//   username: "testuser",
//   email: "testuser@gmail.com",
//   password: "123456",
//   savedSessions: [],
//   savedBooks: []
//  }};
// const options = { upsert: true };
// User.updateOne(query, update, options)
// .then((data)=>console.log(data))
// .catch((err) => console.log(err));

// User.create({
//   username: "testuser",
//   email: "testuser@gmail.com",
//   password: "123456",
//   savedSessions: [],
//   savedBooks: []
// }).then((data)=>console.log(data))
// .catch((err) => console.log(err));

module.exports = User;
