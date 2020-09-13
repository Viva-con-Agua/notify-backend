exports.filter = async (req, res) => {
  try {
    await global.conn
      .collection("filter")
      .deleteMany({ Microservice: "WAVES" }, function (err, res) {
        if (err) throw err;
        console.log("Number of documents deleted: " + res.deletedCount);
      });

    await global.conn.collection("filter").insertOne({
      Microservice: "WAVES",
      type: "application",

      name: "own",
      priority: 1,
      filter_matchingParameter: "userId",
      filter_operator: "==",
      filter_userParameter: "user.id",
    });

    await global.conn.collection("filter").insertOne({
      Microservice: "WAVES",
      type: "comment",

      name: "invested",
      priority: 1,
      filter_matchingParameter: "eventId",
      filter_operator: "IN",
      filter_userParameter: "user.invested",
    });

    await global.conn.collection("filter").insertOne({
      Microservice: "WAVES",
      type: "event",

      name: "necessary",
      priority: 1,
      filter_matchingParameter: "applictions",
      filter_operator: "<",
      filter_userParameter: "5",
    });

    global.conn
      .collection("filter")
      .find({})
      .toArray()
      .then(function (filter) {
        res.json(filter);
      });
  } catch (error) {
    console.log(error);
    console.log("Error in getFilter: ", error.message);

    res.status(400).send({
      message: error.message,
    });
  }
};
