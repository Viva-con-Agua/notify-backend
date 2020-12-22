const { getLongLat } = require("./helperController");
var Distance = require("geo-distance");
const { sendMessage } = require("./MessageController");

exports.sendOutNotifications = async (api) => {
  try {
    console.log("SEND NOTIFICATIONS");
    console.log(api);

    var listPromises = [];

    var mongoFinished = global.conn
      .collection("notifications")
      .find()
      .toArray();

    listPromises.push(mongoFinished);

    var userdataFinished = global.conn
      .collection("user")
      .find()
      .toArray()
      .then(async function (userarray) {
        // console.log("----------User List--------");

        // console.log(userarray);
        for (var i = 0; i < userarray.length; i++) {
          if (!userarray[i].filter[api]) {
            userarray.splice(i, 1);
          }
        }
        // console.log(userarray.length);

        return userarray;
      });

    var filterFinished = global.conn.collection("filter").find().toArray();

    var dataFinished = Promise.all([userdataFinished, filterFinished]).then(
      async function ([userarray, filterentries]) {
        var user = [];
        for (var i = 0; i < userarray.length; i++) {
          userdata = userarray[i];
          console.log(userdata.full_name);

          var enabled = [];
          // console.log("----------Possible Pipelines--------");

          filterentries.forEach((filter) => {
            // console.log(filter.name);

            if (userdata.filter[api][filter.name]) {
              // console.log(userdata.filter[api][filter.name]);

              if (userdata.filter[api][filter.name] == true) {
                enabled.push(filter.name);
              }
            }
          });
          console.log("----------Enabled Pipelines--------");
          console.log(enabled);

          if (enabled.length > 0) {
            var userZip = userdata.address[0].zip;
            var userCity = userdata.address[0].city;

            var location = await getLongLat(userZip + " " + userCity);
            userarray[i].enabled = enabled;
            userarray[i].longitude = location.longitude;
            userarray[i].latitude = location.latitude;

            user.push(userarray[i]);
          }
        }
        // console.log(user.length);

        return user;
      }
    );

    var sortFinished = Promise.all([
      mongoFinished,
      dataFinished,
      filterFinished,
    ]).then(async function ([notifications, userarray, filter]) {
      // console.log(userarray.length);

      for (var i = 0; i < userarray.length; i++) {
        var user = userarray[i];
        // console.log("----------UserDaten--------");

        // console.log(user.full_name);

        // console.log("-----------All Notifications----------");
        // console.log(notifications.length);

        // console.log("-----------Test Pipellines----------");
        var output = [];

        filter.forEach((condition) => {
          if (user.enabled.indexOf(condition.name) != -1) {
            // if (condition.name in user.enabled) {
            // console.log(condition.requirement);

            notifications.forEach((notify) => {
              if (
                condition.Microservice == notify.Microservice &&
                condition.type == notify.type
              ) {
                var notification = notify.matchingParameters;
                // console.log(Math.abs(notification.latitude - user.latitude));

                var dist = Distance.between(
                  { lat: user.latitude, long: user.longitude },
                  { lat: notification.latitude, long: notification.longitude }
                );

                // console.log(dist.human_readable().distance);

                var x = eval(condition.requirement);
                // console.log(x);

                if (x == true) {
                  output.push({ notification: notify, reason: condition.name });

                  notifications = notifications.filter((not) => {
                    return not._id !== notify._id;
                  });
                  // console.log(notifications.length);
                  // console.log(output.length);
                }
              }
            });
          }
        });

        // console.log("-----------Chosen Notifications----------");
        // console.log(output.length);

        var keyArray = output.map(function (item) {
          return item.notification._id.toString();
        });

        var entries = await global.conn
          .collection("user_notifications")
          .find({ notificationId: { $in: keyArray }, userId: user.id })
          .toArray();

        // console.log("-----------Seen or Deleted----------");
        // console.log(entries.length);

        var sendOutList = [];

        for (var k = 0; k < output.length; k++) {
          var matched = false;

          for (var j = 0; j < entries.length; j++) {
            if (entries[j].notificationId == output[k].notification._id) {
              matched = true;

              if (entries[j].status == "new") {
                sendOutList.push(output[k]);
              }
            }
          }
          if (matched == false) {
            sendOutList.push(output[k]);
          }
        }

        console.log("-----------Notifications for Sending out---------");

        console.log(sendOutList.length);

        sendMessage(sendOutList, api, user);
      }

      return sendOutList;
    });

    // sortFinished.then(function (sendOutList, api) {
    //   createMailWaves(sendOutList);
    // });
  } catch (error) {
    console.log("Error in updateDatabase: ", error.message);
  }
};
