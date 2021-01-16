var nodemailer = require("nodemailer");

exports.createAspMail = async result => {
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
    subject: "Du bist ASP in einem poolevent",
    text:
      "Es wurde ein neues Poolevent " +
      result.pooleventName +
      " erstellt, bei dem du als Ansprechpartner eingetragen wurdest!"
  };

  //console.log(mailOptions);

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
};
