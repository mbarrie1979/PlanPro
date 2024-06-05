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
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a session, we'll also get another field called `userCount` with the number of users we have
sessionSchema.virtual('userCount').get(function () {
  return this.users.length;
});

const Session = model('Session', sessionSchema);


module.exports = Session;
