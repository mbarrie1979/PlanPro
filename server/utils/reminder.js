const {sendSendGridMessage} = require('./mailsender');
const { User, Session, Conference } = require('../models');

// Iterate over all users and sessions, and send reminders when due
 sendReminder = async()=>{
    const users = await User.find();
    //Note: Cannot USE forEach with an async clause as forEach run a callback and async code does not wait. Therefore, for loop is used. 
    //users.forEach(async(user)=> await sendUserReminder(user));
    for (let user of users){
        // Get all the user sessions and send reminders for each session if within 15 minutes of start time
        //console.log("*** In send user reminder, User is: " + user.username);
        //console.log("In send user reminder, User session count: " + user.savedSessions.length);
        if (user.getEmailReminders){
            for (let sessionId of user.savedSessions){
        
                // TODO: check if email and/or SMS reminder is enabled, and set reminder sent on user doc if sent
                let session = await Session.findById(sessionId);
                console.log("Session is: " + session);
                // Add local time offset to calculate date correctly as session date is in GMT
                const offset = session.date.getTimezoneOffset();
                let sessionDate = new Date(session.date.getTime() +offset*60000);
                //console.log("Session date before: " + sessionDate);
                hourMinute = session.time.split(":");
                sessionDate.setHours(hourMinute[0]);
                sessionDate.setMinutes(hourMinute[1]);
                //console.log("Session date after: " + sessionDate);
                let currentDate = new Date();
                //console.log("Current Date: " + currentDate);
                // If difference between session date and current date is within 15 minutes , 15x60x1000 = 
                if (sessionDate.getTime() - currentDate.getTime() <=900000){
                    // send reminder if session within 15 minutes of starting
                    const msg = {
                        to: 'milindmjoshi@live.com', // Change to your recipient
                        from: 'mjoshimd@gmail.com', // Change to your verified sender
                        subject: `Session ${session.name} will begin in 15 minutes`,
                        text: `Session ${session.name} will begin in 15 minutes in room ${session.room}. Hope you enjoy it.    PlanPro Admin`,
                        html: `<strong>Session ${session.name} will begin in 15 minutes in room ${session.room}. Hope you enjoy it.   PlanPro Admin`,
                    }
                    console.log("** Sending Email Message: ** " + JSON.stringify(msg));
                    sendSendGridMessage(msg);
                }
            }
    }
  }     
}

 

module.exports = {
    sendReminder
}
