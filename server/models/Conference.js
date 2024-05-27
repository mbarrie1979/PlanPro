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
        unique: true,
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
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// sessionSchema.virtual('userCount').get(function () {
//   return this.users.length;
// });

const Conference = model('Conference', conferenceSchema);

//Test Code
// const query = { name: "Web Developer Conference" };
// const update = { $set: { 
//     name: "Web Developer Conference",
//     description: "Everything you need to become a profiicent full stack web developer. Classes in HTML, CSS, JS, Node JS, MERN, MySQL, and MongoDB. Space is limited, sign up Now! ",
//     startDate: new Date('2024-06-10T00:00:00'),
//     endDate: new Date('2024-06-14T00:00:00'),
//     location: "Walt Disnery World Dolphin Resort, Orlando, FL",
//  }};
// const options = { upsert: true };
// Conference.updateOne(query, update, options)
// .then((data)=>console.log(data))
// .catch((err) => console.log(err));

// Conference.create({
//     name: "Web Developer Conference",
//     description: "Everything you need to become a profiicent full stack web developer. Classes in HTML, CSS, JS, Node JS, MERN, MySQL, and MongoDB. Space is limited, sign up Now! ",
//     startDate: new Date('2024-06-10T00:00:00'),
//     endDate: new Date('2024-06-14T00:00:00'),
//     location: "Walt Disnery World Dolphin Resort, Orlando, FL",
     
// }).then(data => console.log(data))
// .catch(err => console.log(err));

module.exports = Conference;
