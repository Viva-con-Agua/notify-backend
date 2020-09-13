const Axios = require("axios");

exports.test = async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;

    console.log(body.api);
    const { data } = await Axios.get(`${body.api}/notifications`).catch(
      function (error) {
        return Promise.reject(error);
      }
    );

    var notifyarray = data.data;
    // console.log(notifyarray);

    var flags = [],
      output = [],
      matching = [],
      layout = [],
      l = notifyarray.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[notifyarray[i].type]) {
        continue;
      }
      flags[notifyarray[i].type] = true;
      output.push(notifyarray[i].type);
      matching[notifyarray[i].type] = Object.keys(
        notifyarray[i].matchingParameters
      );
      layout[notifyarray[i].type] = Object.keys(
        notifyarray[i].layoutParameters
      );
    }

    console.log(output);
    // console.log(matching);
    // console.log(layout);

    await global.conn.collection("microservices").updateOne(
      { name: body.name },
      {
        $set: {
          name: body.name,
          api: body.api,
          types: output,
        },
      },
      { upsert: true },
      function (err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        console.log("Number of documents updated: " + res.result.nModified);
        console.log("Number of documents matched: " + res.result.nMatched);
        console.log("Number of documents upserted: " + res.result.nUpserted);
      }
    );

    res.status(200).send({
      types: output,
      matching: matching,
      layout: layout,
    });
    // res.json(data);
  } catch (error) {
    // console.log(error);
    console.log("Error in Test: ", error.message);

    res.status(400).send({
      message: error.message,
    });
  }
};

exports.info = async (req, res) => {
  const { body } = req;
  console.log(body);
  listPromises = [];
  listInnerPromises = [];

  try {
    var matching = [];
    var filterarray = [];
    var types = [];
    var layout = [];

    listPromises.push(
      global.conn
        .collection("microservices")
        .find({ name: body.name })
        .toArray()
        .then(function (data) {
          // console.log(data);

          types = data[0].types;
          // console.log(types);

          // console.log(matching);
          // console.log(layout);
          types.forEach((type) => {
            listInnerPromises.push(
              global.conn
                .collection("notifications")
                .findOne({ type: type })
                .then((notify) => {
                  // console.log(notify);

                  // matching[notify.type] = Object.keys(
                  //   notify.matchingParameters
                  // );
                  b = new Object();
                  b["type"] = notify.type;
                  b["parameter"] = Object.keys(notify.matchingParameters);
                  matching.push(b);
                  layout[notify.type] = Object.keys(notify.layoutParameters);
                })
            );
          });
        })
    );

    listPromises.push(
      global.conn
        .collection("filter")
        .find({ Microservice: "WAVES" })
        .toArray()
        .then((filters) => {
          if (filters.length > 0) {
            filters.forEach((filter) => {
              // console.log(filter);

              filterarray.push(filter);
            });
          }
        })
    );

    Promise.all(listPromises).then(() => {
      Promise.all(listInnerPromises).then(() => {
        console.log(filterarray);
        console.log(matching);
        // console.log(layout);
        // matching = JSON.stringify(matching);
        // console.log(matching);

        res.status(200).json({
          types: types,
          filter: filterarray,
          matching: matching,
        });
      });
    });
  } catch (error) {
    console.log("Error in Info: ", error.message);

    res.status(400).send({
      message: error.message,
    });
  }
};
