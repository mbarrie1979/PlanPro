const mongoose = require('mongoose');
const { Conference, Session, User } = require('../models');
const seedData = require('./seedData');

// db name can change to conferencedb once connection.js is changed 
mongoose.connect('mongodb://localhost:27017/googlebooks', { useNewUrlParser: true, useUnifiedTopology: true });

async function seedDatabase() {
  try {
    await mongoose.connection.dropDatabase();

    // Insert conferences
    await Conference.insertMany(seedData.conferences);

    // Insert sessions and save the IDs
    const sessions = await Session.insertMany(seedData.sessions);

    // Insert users and reference session IDs
    const userPromises = seedData.users.map(user => {
        user.savedSessions = sessions.map(session => session._id);
      return new User(user).save();
    });
    await Promise.all(userPromises);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
