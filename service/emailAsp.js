var nodemailer = require("nodemailer");

exports.createAspMail = async result => {
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
    subject: "Du bist ASP in einem poolevent",
    text:
      "Es wurde ein neues Poolevent " +
      result.pooleventName +
      " erstellt, bei dem du als Ansprechpartner eingetragen wurdest!"
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
