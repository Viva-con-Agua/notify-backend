const Axios = require("axios");

exports.update = async (Microservice) => {
  try {
    console.log("Update Database");
    console.log(Microservice);

    await global.conn
      .collection("microservices")
      .find({ name: Microservice })
      .toArray()
      .then(async function (MS_data) {
        const { data } = await Axios.get(MS_data[0].api).catch(function (
          error
        ) {
          return Promise.reject(error);
        });

        var notifyarray = data.data;

        var bulkUpdateOps = notifyarray.map(function (notification) {
          return {
            updateOne: {
              filter: { typeId: notification.typeId, type: notification.type },
              update: { $set: {notification} },
              upsert: true,
            },
          };
        });

        await global.conn
          .collection("notifications")
          .bulkWrite(bulkUpdateOps, function (err, res) {
            if (err) throw err;

            console.log("Number of documents updated: " + res.result.nMatched);
            console.log(
              "Number of documents upserted: " + res.result.nUpserted
            );
          });

        return notifyarray;
      });
  } catch (error) {
    console.log("Error in updateDatabase: ", error.message);
    return error;
  }
};
