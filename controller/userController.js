const Axios = require("axios");
var NodeGeocoder = require("node-geocoder");
const geolib = require("geolib");

exports.user = async (req, res) => {
  console.log("User gefunden:");
  console.log(req.user.full_name);
  res.json(req.user);
};

exports.updateuser = async (req, res) => {
  console.log("Update filter");

  const { body } = req;
  console.log(body.user);

  await global.conn.collection("user").updateOne(
    { id: body.user.id },
    {
      $set: {
        filter: body.user.filter,
        email: body.user.email,
      },
    },
    {
      upsert: false,
    },
    function (err, res) {
      if (err) throw err;
    }
  );

  res.status(200).send();
};
