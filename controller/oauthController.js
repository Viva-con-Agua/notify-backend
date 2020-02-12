const Axios = require("axios");

var NodeGeocoder = require('node-geocoder');
const geolib = require('geolib');


function getLongLat(userZipCity) {

  return new Promise(resolve => {

    var options = {
      provider: 'google',
      httpAdapter: 'https', // Default
      apiKey: process.env.GOOGLE_AUTH,
      formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);
    geocoder.geocode(userZipCity).then(function (res) {
      var longLat = {"longitude": res[0].longitude, "latitude": res[0].latitude};
      resolve(longLat);
    })
  });
}


exports.notify = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        success: false,
        error: "unauthorized, access token required"
      });

    } else {


      var access_token = req.headers.authorization.replace("Bearer ", "");
      const p = await fetchProfile(access_token)
      var userZip = p.profiles[0].supporter.address[0].zip;
      var userCity = p.profiles[0].supporter.address[0].city;
      var userId = p.id;


      const s = await fetchEvents("code");

      const recommendedEvents = await fetchRecommendedEvents("code");

      var poolEvents = [];

      for (var j = 0; j < s.data.length; j++) {
        var poolEvent = s.data[j];
        var poolEventId = poolEvent.id;
        var poolEventLat = poolEvent.latitude;
        var poolEventLong = poolEvent.longitude;
        var poolEventName = poolEvent.name;
        var poolEventCreatedAt = poolEvent.created_at;
        var poolEventCity = poolEvent.locality;
        var poolEventDate = poolEvent.event_start;

        const result = await getLongLat(userZip + " " + userCity)


        var poolEventGeo = {latitude: poolEvent.latitude, longitude: poolEvent.longitude};
        var userGeo = {latitude: result.latitude, longitude: result.longitude};
        var distanceUserPoolEventInMeters = geolib.getDistance(poolEventGeo, userGeo);
        var poolEventDistanceInKilometers = distanceUserPoolEventInMeters / 1000;

        // Favorite Artist?
        var newNotifyAdded = false;
        for (var x = 0; x < recommendedEvents.data.length; x++) {
          if (poolEventId == recommendedEvents.data[x].actionId) {
            var poolEventFavoriteArtistName = recommendedEvents.data[x].artistName;

            var notifyParameters = {
              "poolEventName": poolEventName,
              "poolEventLat": poolEventLat,
              "poolEventLong": poolEventLong,
              "poolEventCity": poolEventCity,
              "poolEventDate": poolEventDate,
              "poolEventDistanceKm": poolEventDistanceInKilometers,
              "poolEventFavoriteArtist": poolEventFavoriteArtistName
            };

            var notify = {
              "notifyMicroservice": "SUGGESTY",
              "notifyCreatedAt": poolEventCreatedAt,
              "notifyLink": "#",
              "notifyParameters": notifyParameters
            }
            poolEvents.push(notify);
            newNotifyAdded = true;
            break;
          }
        }


        // Distance < 1000 km?
        if (!newNotifyAdded && poolEventDistanceInKilometers < 1000) {
          var notifyParameters = {
            "poolEventName": poolEventName,
            "poolEventLat": poolEventLat,
            "poolEventLong": poolEventLong,
            "poolEventCity": poolEventCity,
            "poolEventDate": poolEventDate,
            "poolEventDistanceKm": poolEventDistanceInKilometers
          };

          var notify = {
            "notifyMicroservice": "WAVES",
            "notifyCreatedAt": poolEventCreatedAt,
            "notifyLink": "#",
            "notifyParameters": notifyParameters
          }
          poolEvents.push(notify);
        }
      }
    }

    res.json(poolEvents);

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error
    });
  }
};


exports.authenticate = async (req, res) => {
  try {
    const {code, state} = req.query;
    const s = await fetchToken(code);

    const p = await fetchProfile(s.access_token)

    var userZip = p.profiles[0].supporter.address[0].zip;
    var userCity = p.profiles[0].supporter.address[0].city;
    const result = await getLongLat(userZip + " " + userCity);

    res.cookie("longitude", result.longitude);
    res.cookie("latitude", result.latitude);
    res.cookie("user_zip", p.profiles[0].supporter.address[0].zip);
    res.cookie("user_id", p.id);
    res.cookie("access_token", s.access_token).redirect(state);

  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
};


const fetchToken = async code => {
  try {
    const {data} = await Axios.get(
      `https://stage.vivaconagua.org/drops/oauth2/access_token?grant_type=authorization_code&client_id=notify&code=${code}&redirect_uri=http://localhost:8005/v1/events/oauth`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProfile = async access_token => {
  try {
    const {data} = await Axios.get(
      "https://stage.vivaconagua.org/drops/oauth2/rest/profile?access_token=" +
      access_token
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchRecommendedEvents = async code => {

  try {
    const {data} = await Axios.get(
      `http://localhost:5001/suggesty/api/v1/spotify/suggestion/user/a1f198b5-09f0-4271-b3b3-89e4a0e655e7`
    );

    return data;
  } catch (error) {
    throw error;
  }


}

const fetchEvents = async code => {
  try {
    const {data} = await Axios.get(
      `http://localhost:5000/waves/api/v1/poolevent/notify`
    );
    return data;
  } catch (error) {
    throw error;
  }
};


exports.receiveToken = (req, res) => {
  res.json({});
};
