const { Schema, model } = require('mongoose');


const sessionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    presenters: [String],
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    room: {
      type: String,
      required: true,
      unique: false,
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    conferenceId: {
      type: Schema.Types.ObjectId,
      ref: 'Conference',
      required: true,
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
sessionSchema.virtual('userCount').get(function () {
  return this.users.length;
});

const Session = model('Session', sessionSchema);

//Test Code

// const query = { name: "CSS3" };
// const update = {
//   $set: {
//     name: "CSS3",
//     description: "An introduction to CSS",
//     presenters: ["Gabe Perry", "John Hy"],
//     date: new Date('2024-06-10T06:00:00'),
//     duration: 1,
//     room: "101B",
//     users: [],
//   }
// };
// const options = { upsert: true };
// Session.updateOne(query, update, options)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));


// Session.create({
//     name: "CSS3",
//     description: "An introduction to CSS",
//     presenters: ["Gabe Perry", "John Hy"],
//     date: new Date('2024-06-10T06:00:00'),
//     duration: 1,
//     room: "101B",
//     users: [],
// }).then(data => console.log(data))
// .catch(err => console.log(err));

module.exports = Session;
