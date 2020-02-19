const NATS = require("nats");
var nodemailer = require("nodemailer");
const { getUserInformation } = require("../controller/userController.js");

const initSubscriber = () => {
  var transporter = nodemailer.createTransport({
    host: "mail.gmx.com",
    port: 465,
    secure: true,
    auth: {
      user: "vivatest@gmx.de",
      pass: "vivapassword"
    }
  });

  try {
    const nc = NATS.connect();

    // Simple Subscriber
    // nc.subscribe("*", function(msg) {
    //   console.log("Received a message: " + msg);
    // });

    // nc.subscribe("*.*", function(msg) {
    //   console.log("Received a message: " + msg);
    // });

    nc.subscribe("application.edit", function(msg) {
      console.log("application with id: " + msg + " changed");
      getUserInformation("Application", msg, (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log(result);

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
        }
      });
    });

    nc.subscribe("poolevent.create", function(msg) {
      console.log("New Event with id: " + msg);

      getUserInformation("NewEvent", msg, (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log(result);

          result.forEach(res => {
            var mailOptions = {
              from: "vivatest@gmx.de",
              to: res.userMail,
              subject: "New Poolevent in " + res.region,
              text:
                "Es wurde ein neues Poolevent " +
                res.pooleventName +
                " in deiner Nähe in " +
                res.region +
                " erstellt!"
            };

            console.log(mailOptions);

            // transporter.sendMail(mailOptions, function(error, info) {
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log("Email sent: " + info.response);
            //   }
            // });
          });
        }
      });
    });

    nc.subscribe("poolevent.edit", function(msg) {
      console.log("Event with id: " + msg + " changed");

      getUserInformation("ChangedEvent", msg, (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log(result);

          result.forEach(res => {
            var mailOptions = {
              from: "vivatest@gmx.de",
              to: res.userMail,
              subject: "Poolevent " + res.pooleventName + "changed",
              text: "There were some changes in Poolevent " + res.pooleventName
            };

            console.log(mailOptions);

            // transporter.sendMail(mailOptions, function(error, info) {
            //   if (error) {
            //     console.log(error);
            //   } else {
            //     console.log("Email sent: " + info.response);
            //   }
            // });
          });
        }
      });
    });
  } catch (error) {
    console.log(`error in initSubscriber ${error.message}`);
  }
};

module.exports = initSubscriber;
