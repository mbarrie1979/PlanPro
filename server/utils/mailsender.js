const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
// Enable access to .env variables
require('dotenv').config();

//Twilio Send Grid email sender
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

let API_KEY = process.env.MAIL_API_KEY;


const sendDefaultSendGridMessage = () =>{
    const msg = {
    to: 'milindmjoshi@live.com', // Change to your recipient
    from: 'mjoshimd@gmail.com', // Change to your verified sender
    subject: 'Conference is about to begin',
    text: 'Your conference will begin tomorrow. Hope you enjoy it. ',
    html: '<strong>Your conference will begin tomorrow. Hope you enjoy it.',
    }
    sendSendGridMessage(msg);
   
}

const sendSendGridMessage = (msg) =>{
    sgMail.setApiKey(API_KEY);
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error('Error sending emai' + error)
    })
}



 

// Brevo SMTP server. This is currently not being used but can revert back to if needed as using the Twilio sendGrid server
// Begin BREVO code. Can remove if we use Twilio. Brevo code uses nodemailer module. 
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "75e177001@smtp-brevo.com",
      pass: "Z3QKm12SbCRFsD47",
    },
  });

// const verifySMTP = () => transporter.verify().then(console.log).catch(console.error);
  const verifySMTP = ()=> transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("SMTP Server is ready to take our messages");
    }
  });

  const sendMessage = (message) =>  {
    transporter.sendMail(message, mailCallback)
  }

  // test sending email
  const sendDefaultMessage = () =>{
    var message = {
        from: "admin@planpro.com",
        to: "milindmjoshi@live.com",
        subject: "You have an upcoming session coming up",
        text: "Your session will start in 15 minutes",
        html: "<p>Your session will start in 15 minutes</p>",
      };
      sendMessage(message);
  }

  const mailCallback = (err,info) => {
    if (err){
        console.log("Error sending mail: " + err)
    }
    else{
        console.log(`Mail sent successfully, envelope ${JSON.stringify(info.envelope)}`);
    }
  }
  // End Brevo Code

 

module.exports = {
    verifySMTP,
    sendDefaultSendGridMessage,
    sendSendGridMessage,
}
