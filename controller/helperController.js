var NodeGeocoder = require("node-geocoder");

exports.getLongLat = async (req, res) => {
  var userZipCity = req;

  var options = {
    provider: "opencage",
    httpAdapter: "https",
    apiKey: "68abc0e17ce54ede8b5ea7d267c34112",
    formatter: null,
  };

  var geocoder = NodeGeocoder(options);

  return await geocoder
    .geocode(userZipCity)
    .then(function (res) {
      var longLat = {
        longitude: res[0].longitude,
        latitude: res[0].latitude,
      };
      // console.log(longLat);
      return longLat;
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};
