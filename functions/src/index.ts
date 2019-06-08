const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.SendEmail = functions.https.onRequest((request: { body: { toEmail: any; name: any; message: any; email: any; }; }, response: { status: { (arg0: number): { send: (arg0: { message: string; }) => void; }; (arg0: number): { send: (arg0: { message: string; }) => void; }; }; }) => {    
    cors(request, response, () => {
        const mailOptions = {
            to: request.body.toEmail,
            subject: `BigPawsBulldogs Inquiry from ${request.body.name}`,
            text: `${request.body.message} ${request.body.email}`
        };
        mailTransport.sendMail(mailOptions).then(() => {
            response.status(200).send({message: 'Mail sent!'});
        })
        .catch((error: string) => {
            response.status(500).send({message: 'Mail not sent: ' + error});
        });
    });
});