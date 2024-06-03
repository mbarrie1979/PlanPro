const accountSid = 'ACe4d5a2ab19bb7b94508e6c436447e7fb';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);


//TODO: Need to complete account Twilio Setup for SMS
const sendDefaultSMS = ()=> {
    let msg = {
        body: 'Your session will start in 15 minutes',
        from: '+18662413810',
            to: '+12404742239'
    }
    sendSMS(msg)
}

const sendSMS = (msg)=> {
    client.messages
        .create(msg)
        .then(message => console.log(message.sid))
        .done();
}