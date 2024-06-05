const { Schema, model } = require('mongoose');


const conferenceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      unique: false,
    },
    image: {
      type: String,
      required: true,
      unique: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);



const Conference = model('Conference', conferenceSchema);



module.exports = Conference;
