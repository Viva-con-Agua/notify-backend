var nodemailer = require("nodemailer");

exports.createApplicationMail = async result => {
  var transporter = nodemailer.createTransport({
    host: "mail.gmx.com",
    port: 465,
    secure: true,
    auth: {
      user: "vivatest@gmx.de",
      pass: "vivapassword"
    }
  });

  var mailOptions = {
    from: "vivatest@gmx.de",
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
