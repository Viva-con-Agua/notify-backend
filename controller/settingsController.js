const Axios = require("axios");
const { update } = require("./updateDatabaseController");

exports.testAPI = async (req, res) => {
  console.log("TEST API");
  const { body } = req;
  console.log(body);

  try {
    const { data } = await Axios.get(`${body.api}`).catch(function (error) {
      return Promise.reject(error);
    });

    var notifyarray = data.data;

    var Microservice = true,
      type = true,
      date = true,
      typeId = true,
      validTill = true,
      matchingParameters = true,
      layoutParameters = true,
      name = true,
      l = notifyarray.length,
      flags = [],
      types = [];

    for (var i = 0; i < l; i++) {
      if (!("type" in notifyarray[i])) {
        type = false;
      }
      if (!("date" in notifyarray[i])) {
        date = false;
      }
      if (!("typeId" in notifyarray[i])) {
        typeId = false;
      }
      if (!("validTill" in notifyarray[i])) {
        validTill = false;
      }
      if (!("matchingParameters" in notifyarray[i])) {
        matchingParameters = false;
      }
      if (!("layoutParameters" in notifyarray[i])) {
        layoutParameters = false;
      }
      if (!("Microservice" in notifyarray[i])) {
        Microservice = false;
      } else {
        if (body.name != notifyarray[i].Microservice) {
          name = notifyarray[i].Microservice;
        }
      }
    }

    var obj = {};

    for (i = 0; i < l; i++) {
      if (flags[notifyarray[i].type]) {
        continue;
      }
      flags[notifyarray[i].type] = true;
      types.push(notifyarray[i].type);
      obj[notifyarray[i].type] = "null";
    }

    console.log(obj);

    if (
      Microservice == true &&
      type == true &&
      date == true &&
      typeId == true &&
      validTill == true &&
      matchingParameters == true &&
      layoutParameters == true &&
      name == true
    ) {
      await global.conn.collection("microservices").updateOne(
        { name: body.name },
        {
          $setOnInsert: {
            name: body.name,
            api: body.api,
            types: obj,
          },
        },
        { upsert: true },
        function (err, res) {
          if (err) throw err;
          console.log("New Microservice: " + res.upsertedCount);
          console.log("Microservice changed: " + res.matchedCount);
        }
      );
    }

    res.status(200).send({
      Microservice: Microservice,
      type: type,
      date: date,
      typeId: typeId,
      validTill: validTill,
      matchingParameters: matchingParameters,
      layoutParameters: layoutParameters,
      name: name,
    });
  } catch (error) {
    console.log("Error in Test API: ", error.message);
    res.status(400).send({
      message: error.message,
    });
  }
};

exports.info = async (req, res) => {
  const { body } = req;
  console.log("GET API INFO");
  console.log(body);

  listPromises = [];
  listInnerPromises = [];

  await update(body.name);

  try {
    var matching = [];
    var filterarray = [];
    var types = [];
    var layout = [];
    var categories = [];

    listPromises.push(
      //Get Types for Microservice
      global.conn
        .collection("microservices")
        .find({ name: body.name })
        .toArray()
        .then(function (data) {
          categories = data[0].types;
          types = Object.keys(data[0].types);

          types.forEach((type) => {
            listInnerPromises.push(
              //For each type get Matchingparameter
              global.conn
                .collection("notifications")
                .findOne({ type: type })
                .then((notify) => {
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
      //Get filter already in place
      global.conn
        .collection("filter")
        .find({ Microservice: body.name })
        .toArray()
        .then((filters) => {
          if (filters.length > 0) {
            filters.forEach((filter) => {
              filterarray.push(filter);
            });
          }
        })
    );

    listPromises.push(
      //Get filter already in place
      global.conn
        .collection("user")
        .findOne({ id: "1234" })
        .then((res) => {
          userparameter = res;
        })
    );

    // var userparameter = ["name", "invested", "crews", "location", "role"];

    //Wait for everything to finish
    Promise.all(listPromises).then(() => {
      Promise.all(listInnerPromises).then(() => {
        console.log("Number filter: " + filterarray.length);
        console.log("Number types: " + matching.length);

        res.status(200).json({
          types: types,
          filter: filterarray,
          matching: matching,
          userparameter: userparameter,
          categories: categories,
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

exports.saveCategories = async (req, res) => {
  console.log("SETUP Categories");
  const { body } = req;
  console.log(body);

  try {
    await global.conn.collection("microservices").updateOne(
      { name: body.Microservice },
      {
        $set: {
          types: body.types,
        },
      },
      { upsert: true },
      function (err, res) {
        if (err) throw err;
        console.log("New category: " + res.upsertedCount);
        console.log("category changed: " + res.matchedCount);
      }
    );
    res.status(200);
  } catch (error) {
    console.log("Error in SaveCategories: ", error.message);

    res.status(400).send({
      message: error.message,
    });
  }
};

exports.saveConditions = async (req, res) => {
  console.log("SETUP Conditions");
  const { body } = req;

  var types = body.types;
  var updatearray = body.conditions;

  try {
    types.forEach((type) => {
      for (var i = 0; i < updatearray[type].length; i++) {
        if (updatearray[type][i]._id == null) {
          global.conn.collection("filter").insertOne(
            {
              name: updatearray[type][i].name,
              Microservice: body.Microservice,
              type: type,
              description: updatearray[type][i].description,
              requirement: updatearray[type][i].requirement,
            },
            function (err, res) {
              if (err) throw err;

              console.log("Number of filter Inserted: " + res.nInserted);
            }
          );
        }
      }
    });

    var objarray = [];
    var ObjectId = require("mongodb").ObjectId;

    for (var i = 0; i < body.missing.length; i++) {
      objarray[i] = new ObjectId(body.missing[i]);
    }

    await global.conn
      .collection("filter")
      .deleteMany({ _id: { $in: objarray } }, function (err, res) {
        if (err) throw err;

        console.log("Number of filter deleted: " + res.deletedCount);
      });
    res.status(200);
  } catch (error) {
    console.log("Error in SaveConditions: ", error.message);

    res.status(400).send({
      message: error.message,
    });
  }
};
