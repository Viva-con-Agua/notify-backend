const NATS = require("nats");
const { getUserInformation } = require("../controller/userController.js");
const { createApplicationMail } = require("../service/emailApplication.js");
const { createAspMail } = require("../service/emailAsp.js");

const initSubscriber = () => {
  console.log("init");
  try {
    console.log(process.env.NATS_URI);
    const nc = NATS.connect(process.env.NATS_URI);

    // Simple Subscriber
    // nc.subscribe("*", function(msg) {
    //   console.log("Received a message: " + msg);
    // });

    // nc.subscribe("*.*", function(msg) {
    //   console.log("Received a message: " + msg);
    // });

    nc.subscribe("application.edit", function (msg) {
      console.log("application with id: " + msg + " changed");
      getUserInformation("Application", msg, (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log(result);

          createApplicationMail(result);
        }
      });
    });

    nc.subscribe("poolevent.get", function (msg) {
      console.log("New Event with id: " + msg);

      getUserInformation("NewEvent", msg, (error, result) => {
        if (error) {
          console.log(error);
        }
        if (result) {
          console.log(result);

          createAspMail(result);
        }
      });
    });

    // nc.subscribe("poolevent.edit", function(msg) {
    //   console.log("Event with id: " + msg + " changed");

    //   getUserInformation("ChangedEvent", msg, (error, result) => {
    //     if (error) {
    //       console.log(error);
    //     }
    //     if (result) {
    //       console.log(result);

    //       result.forEach(res => {
    //         var mailOptions = {
    //           from: "vivatest@gmx.de",
    //           to: res.userMail,
    //           subject: "Poolevent " + res.pooleventName + "changed",
    //           text: "There were some changes in Poolevent " + res.pooleventName
    //         };

    //         console.log(mailOptions);

    //         transporter.sendMail(mailOptions, function(error, info) {
    //           if (error) {
    //             console.log(error);
    //           } else {
    //             console.log("Email sent: " + info.response);
    //           }
    //         });
    //       });
    //     }
    //   });
    // });
  } catch (error) {
    console.log(`error in initSubscriber ${error.message}`);
  }
};

module.exports = initSubscriber;
