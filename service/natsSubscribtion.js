const NATS = require("nats");
const { update } = require("../controller/updateDatabaseController.js");
const { sendOutNotifications } = require("../controller/thirdPartyController");

function getTimeLeft(timeout) {
  return Math.ceil(
    (timeout._idleStart + timeout._idleTimeout - Date.now()) / 1000
  );
}

const initSubscriber = () => {
  console.log("init");
  try {
    console.log(process.env.NATS_URI);
    const nc = NATS.connect(process.env.NATS_URI);

    var api_count = 3;

    var timer = new Array(api_count).fill(0);

    // Simple Subscriber
    // nc.subscribe("*", function(msg) {
    //   console.log("Received a message: " + msg);
    // });

    // nc.subscribe("*.*", function(msg) {
    //   console.log("Received a message: " + msg);
    // });

    nc.subscribe("notification", function (msg) {
      console.log("new updates from: " + msg);
      update(msg);

      for (let j = 1; j < api_count; j++) {
        console.log(getTimeLeft(timer[j]));

        if (timer[j] == 0) {
          global.conn
            .collection("apis")
            .find({})
            .toArray()
            .then(function (apis) {
              console.log("apis gefunden: ");
              console.log(apis.length);

              for (let i = 0; i < apis.length; i++) {
                console.log(apis[i].name + " timer: " + apis[i].timer);

                timer[j] = setTimeout(() => {
                  // console.log(i);
                  // console.log(apis[i]);

                  sendOutNotifications(apis[i].name);
                }, apis[i].timer);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    });
  } catch (error) {
    console.log(`error in initSubscriber ${error.message}`);
  }
};

module.exports = initSubscriber;
