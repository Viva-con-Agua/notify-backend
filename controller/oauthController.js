const Axios = require("axios");
const { getStatus } = require("../controller/notifyController");
var NodeGeocoder = require("node-geocoder");
const geolib = require("geolib");
const var_dump = require("var_dump");

function getLongLat(userZipCity) {
  return new Promise(resolve => {
    var options = {
      provider: "google",
      httpAdapter: "https", // Default
      apiKey: process.env.GOOGLE_AUTH,
      formatter: null // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);
    geocoder.geocode(userZipCity).then(function(res) {
      var longLat = { longitude: res[0].longitude, latitude: res[0].latitude };
      resolve(longLat);
    });
  });
}

exports.notify = async (req, res) => {
  console.log("Get new poolevents!");
  try {
    // if (!req.headers.authorization) {
    //   res.status(400).json({
    //     success: false,
    //     error: "unauthorized, access token required"
    //   });
    // } else {
    var access_token = req.headers.authorization.replace("Bearer ", "");
    const p = await fetchProfile(access_token);
    var userZip = p.profiles[0].supporter.address[0].zip;
    var userCity = p.profiles[0].supporter.address[0].city;
    var userId = p.id;

    //First step: Get interesting new Events for user
    //-----------------------------------------------
    const s = await fetchEvents("code");

    var poolEvents = [];

    const result = await getLongLat(userZip + " " + userCity);
    var userGeo = {
      latitude: result.latitude,
      longitude: result.longitude
    };
    console.log("User: ", result);
    counter = 0;

    // var_dump(s.data);

    var filteredEvents = [];

    s.data.forEach(poolEvent => {
      //Awareness Pipeline: Necessity
      //Get all Events with number_of_applications < (supp_lim -3) AND application_end < 5 days in the future
      //--------------------------------
      var date = new Date();
      var last = date.getTime() - 5 * 24 * 60 * 60 * 1000;

      console.log(
        "application_date soon: ",
        Date.parse(poolEvent.application_end) > last
      );
      console.log(
        "supporter neede: ",
        poolEvent.applications < poolEvent.supporter_lim - 3
      );

      if (
        poolEvent.applications < poolEvent.supporter_lim - 3 &&
        Date.parse(poolEvent.application_end) > last
      ) {
        poolEvent.Microservice = "WAVES.Necessity";
        filteredEvents.push(poolEvent);
        console.log("NEC: ", poolEvent.name);
      } else {
        //Awareness Pipeline: Distance
        //Get all Events in 500 km Radius
        //--------------------------------
        if (
          typeof poolEvent.latitude === "undefined" ||
          typeof poolEvent.longitude === "undefined"
        ) {
          return true;
        }

        var poolEventGeo = {
          latitude: poolEvent.latitude,
          longitude: poolEvent.longitude
        };

        const distance = geolib.getDistance(poolEventGeo, userGeo);
        const distanceInKm = distance / 1000;
        if (distanceInKm <= 500) {
          poolEvent.Microservice = "WAVES.Distance";
          filteredEvents.push(poolEvent);
          console.log("LOC: ", poolEvent.name);
        }
      }
      //Awareness Pipeline: Recomendations
      //Von Suggesty
      //--------------------------------
    });
    // var_dump(filteredEvents);

    var poolEventStatus;
    var promises = [];

    filteredEvents.forEach(poolEvent => {
      var promise = getStatus("event", userId, poolEvent.id).then(
        poolEventStatusResult => {
          poolEventStatus =
            poolEventStatusResult.length > 0
              ? poolEventStatusResult[0].status
              : "new"; //resp from array to string

          console.log("Status1", poolEventStatus);

          if (poolEventStatus === "deleted") {
            return;
          }

          var notifyParameters = {
            poolEventName: poolEvent.name,
            poolEventLat: poolEvent.latitude,
            poolEventLong: poolEvent.longitude,
            poolEventCity: poolEvent.locality,
            poolEventDate: poolEvent.event_start
          };

          var notify = {
            notifyMicroservice: poolEvent.Microservice,
            notifyCreatedAt: poolEvent.created_at,
            notifyLink: "#",
            notifyStatus: poolEventStatus,
            notifyParameters: notifyParameters,
            notifyType: "ACTION"
          };

          // var_dump(notify);

          poolEvents.push(notify);
        }
      );
      promises.push(promise);
    });

    Promise.all(promises).then(() => {
      // var_dump(poolEvents);
      res.json(poolEvents);
    });
  } catch (error) {
    console.log("Error in getNotifications: ", error);
  }
};

exports.authenticate = async (req, res) => {
  try {
    const { code, state } = req.query;
    console.log(code);
    const s = await fetchToken(code);
    console.log(s);

    const p = await fetchProfile(s.access_token);
    console.log(p);

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
    const { data } = await Axios.get(
      `https://stage.vivaconagua.org/drops/oauth2/access_token?grant_type=authorization_code&client_id=notify&code=${code}&redirect_uri=http://localhost:8005/v1/events/oauth`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProfile = async access_token => {
  try {
    const { data } = await Axios.get(
      "https://stage.vivaconagua.org/drops/oauth2/rest/profile?access_token=" +
        access_token
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchEvents = async code => {
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/waves/api/v1/poolevent/notify`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const getDistance = async (poolEventGeo, userGeo) => {
  try {
    var data = geolib.getDistance(poolEventGeo, userGeo);
    console.log("Distance: ", distanceInKm);
    // resolve(distanceInKm);
    return data;
  } catch (error) {
    throw error;
  }
};

exports.receiveToken = (req, res) => {
  res.json({});
};
