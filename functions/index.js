const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.SendEmail = functions.https.onRequest((request, response) => {    
    cors(request, response, () => {
        const mailOptions = {
            to: request.body.toEmail,
            subject: `BigPawsBulldogs Inquiry from ${request.body.name}`,
            text: `${request.body.message} ${request.body.email}`
        };
        mailTransport.sendMail(mailOptions).then(() => {
            return response.status(200).send({message: 'Mail sent!'});
        })
        .catch((error) => {
            return response.status(500).send({message: 'Mail not sent: ' + error});
        });
    });
});