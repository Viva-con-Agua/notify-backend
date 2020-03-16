var nodemailer = require("nodemailer");

exports.createApplicationMail = async result => {
  var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.MAIL_USER,
    to: result.userMail,
    subject: "Your Application to Poolevent " + result.pooleventName,
    text:
      "Your Application to Poolevent " +
      result.pooleventName +
      " is " +
      result.applicationStatus
  };

  console.log(mailOptions);

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
};
