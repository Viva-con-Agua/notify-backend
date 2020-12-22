exports.filter = async (req, res) => {
  try {
    global.conn
      .collection("filter")
      .find({})
      .toArray()
      .then(function (filter) {
        console.log("Filter gefunden: ");
        console.log(filter.length);

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

exports.apis = async (req, res) => {
  try {
    global.conn
      .collection("apis")
      .find({})
      .toArray()
      .then(function (apis) {
        console.log("apis gefunden: ");
        console.log(apis.length);

        res.json(apis);
      });
  } catch (error) {
    console.log(error);
    console.log("Error in getAPIs: ", error.message);

    res.status(400).send({
      message: error.message,
    });
  }
};
