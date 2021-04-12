const nodemailer = require("nodemailer");

const EMAIL_SECRET = "ICGKHFuQUNwCbvpK0Q9i36876385^%#&^%EfacvJCbcan";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASS,
  },
});

function sendVerificationMail(api, email) {
  return transporter.sendMail({
    to: email,
    from: "Comic Quotes",
    subject: "Thankyou for registering",
    html: `Hi ${email} we're glad that you registered for Comic Quotes. Heres your API Key - ${api}`,
  });
}
module.exports = { transporter, sendVerificationMail };
