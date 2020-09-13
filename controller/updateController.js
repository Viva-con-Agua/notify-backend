const Axios = require("axios");

exports.update = async (req, res) => {
  try {
    console.log("Update Database");

    var notificationsWaves = await getNotificationsWaves();

    var notifyarray = notificationsWaves.data;

    // await global.conn
    //   .collection("notifications")
    //   .deleteMany({ Microservice: "WAVES" }, function (err, res) {
    //     if (err) throw err;
    //     console.log("Number of documents deleted: " + res.deletedCount);
    //   });

    // global.conn
    //   .collection("notifications")
    //   .find({ Microservice: "WAVES" }, function (err, res) {
    //     if (err) throw err;
    //     console.log(res);
    //   });

    var bulkUpdateOps = notifyarray.map(function (notification) {
      return {
        updateOne: {
          filter: { typeId: notification.typeId, type: notification.type },
          update: { $set: notification },
          upsert: true,
        },
      };
    });

    await global.conn
      .collection("notifications")
      .bulkWrite(bulkUpdateOps, function (err, res) {
        if (err) throw err;

        console.log("Number of documents updated: " + res.result.nModified);
        console.log("Number of documents matched: " + res.result.nMatched);
        console.log("Number of documents upserted: " + res.result.nUpserted);
      });

    // global.conn
    //   .collection("notifications")
    //   .insertMany(notifyarray, function (err, res) {
    //     if (err) throw err;
    //     console.log("Number of documents inserted: " + res.insertedCount);
    //   });

    var cursor = await global.conn.collection("notifications").find({});

    cursor.count(function (err, count) {
      console.log("Total matches: " + count);
    });
    // console.log(notifyarray);

    res.json(notificationsWaves);
  } catch (error) {
    console.log(error);
    // Promise// res.status(error.status).send({ message: error.send });
    console.log(
      "Error in updateDatabase: ",
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

const getNotificationsWaves = async (code, res) => {
  const waves_api =
    process.env.ENV === "dev"
      ? process.env.WAVES_API_DEV
      : process.env.WAVES_API_PRODUCTION;

  console.log(waves_api);
  const { data } = await Axios.get(`${waves_api}/notifications`).catch(
    function (error) {
      return Promise.reject(error);
    }
  );
  return data;
};
