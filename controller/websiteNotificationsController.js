var Distance = require("geo-distance");
var sortBy = require("array-sort-by");

var dateFormat = require("dateformat");

const { getLongLat } = require("./helperController");

exports.notifications = async (req, res) => {
  try {
    console.log("NOTIFICATIONS!");

    var mongoFinished = global.conn
      .collection("notifications")
      .find()
      .toArray();

    user = req.user;
    var userZip = user.address[0].zip;
    var userCity = user.address[0].city;

    var Location = await getLongLat(userZip + " " + userCity);

    var disabledPipelines = [];
    var filterentries = Object.keys(user.filter);

    filterentries.forEach((name) => {
      if (user.filter[name] == false) {
        disabledPipelines.push(name);
      }
    });
    console.log("----------disabledPipelines--------");
    console.log(disabledPipelines);

    filterFinished = global.conn
      .collection("filter")
      .find({ name: { $nin: disabledPipelines } })
      .toArray();

    var MSTypesFinished = global.conn
      .collection("microservices")
      .find()
      .toArray();

    var sortFinished = Promise.all([
      mongoFinished,
      filterFinished,
      Location,
    ]).then(async function ([notifications, filter, result]) {
      console.log("----------UserDaten--------");
      console.log(user);

      user.longitude = result.longitude;
      user.latitude = result.latitude;

      console.log("-----------All Notifications----------");
      console.log(notifications.length);

      console.log("-----------Use Pipellines----------");
      var output = [];

      filter.forEach((condition) => {
        console.log(condition.requirement);

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
      });

      console.log("-----------Chosen Notifications----------");
      console.log(output.length);

      var keyArray = output.map(function (item) {
        return item.notification._id.toString();
      });

      var entries = await global.conn
        .collection("user_notifications")
        .find({ notificationId: { $in: keyArray }, userId: user.id })
        .toArray();

      console.log("-----------Seen or Deleted----------");
      console.log(entries.length);

      for (var i = 0; i < output.length; i++) {
        var matched = false;

        for (var j = 0; j < entries.length; j++) {
          if (entries[j].notificationId == output[i].notification._id) {
            if (entries[j].status == "deleted") {
              output.splice(i, 1);
            } else {
              output[i].status = entries[j].status;
              matched = true;
            }
          }
        }
        if (matched == false) {
          output[i].status = "new";
        }
      }

      // console.log(output);
      return output;
    });

    Promise.all([sortFinished, MSTypesFinished]).then(function ([
      notifications,
      ms_data,
    ]) {
      console.log("------------AUfteilung Classen------------");
      // console.log(notifications);

      console.log(ms_data);

      sortBy(notifications, (s) => -new Date(s.notification.date));

      // var notificationsFinal = [];
      for (var x = 0; x < notifications.length; x++) {
        notifications[x].notification.date = dateFormat(
          new Date(notifications[x].notification.date),
          "dd.mm.yyyy h:MM:ss"
        );

        for (var i = 0; i < ms_data.length; i++) {
          if (ms_data[i].name == notifications[x].notification.Microservice) {
            notifications[x].notifytype =
              ms_data[i].types[notifications[x].notification.type];
          }
        }
      }

      res.json(notifications);
    });
  } catch (error) {
    console.log(error);
    // Promise// res.status(error.status).send({ message: error.send });
    console.log(
      "Error in getNotifications: ",
      error.message
      // error.function,
      // error.status,
      // error.message
    );

    res.status(400).send({
      message: error.message,
    });
  }
};

exports.updateNotificationStatus = async (req, res) => {
  const { body } = req;

  console.log("STATUS UPDATE");
  console.log(body);

  try {
    var bulkUpdateOps = body.ids.map(function (id) {
      return {
        updateOne: {
          filter: { notificationId: id },
          update: {
            $set: {
              notificationId: id,
              status: body.status,
              userId: body.user,
            },
          },
          upsert: true,
        },
      };
    });

    await global.conn
      .collection("user_notifications")
      .bulkWrite(bulkUpdateOps, function (err, res) {
        if (err) throw err;

        console.log("Number of documents updated: " + res.result.nModified);
        console.log("Number of documents matched: " + res.result.nMatched);
        console.log("Number of documents upserted: " + res.result.nUpserted);
      });

    // await global.conn
    //   .collection("user_notifications")
    //   .updateOne(
    //     { notificationId: body.id },
    //     {
    //       $set: {
    //         notificationId: body.id, status: body.status, userId: body.user
    //       },
    //     },
    //     {
    //       upsert: true
    //     }, function (err, res) {
    //       if (err) throw err;

    //       console.log("Number of documents updated: " + res.result.nModified);
    //       console.log("Number of documents matched: " + res.result.nMatched);
    //       console.log("Number of documents upserted: " + res.result.nUpserted);
    //     });
  } catch (error) {
    console.log(error);
    // Promise// res.status(error.status).send({ message: error.send });
    console.log(
      "Error in updateNotificationStatus: ",
      error.message
      // error.function,
      // error.status,
      // error.message
    );

    res.status(400).send({
      message: error.message,
    });
  }
};
