const Axios = require("axios");
var NodeGeocoder = require("node-geocoder");
const geolib = require("geolib");

exports.getUserInformation = async (type, typeId, callback) => {
  // new Promise((resolve, reject) => {
  try {
    console.log("Get user Information to " + type);

    if (type === "Application") {
      var applicationData = await fetchApplication(typeId);
      console.log(applicationData.data);

      //   var userData = fetchProfile(applicationData.user_id);
      var userData = {
        id: "a1f198b5-09f0-4271-b3b3-89e4a0e655e7",
        name: "Nicola",
        email: "nicola@schulze-sulingen.de",
        emailNotifications: "true"
      };

      if (userData.emailNotifications === "true") {
        var userInformation = {
          userName: userData.name,
          userMail: userData.email,
          pooleventName: applicationData.data[0].poolevent_id,
          applicationStatus: applicationData.data[0].state
        };
      }
      //   var userData = fetchProfile(applicationData.user_id);
      var userData = {
        id: "a1f198b5-09f0-4271-b3b3-89e4a0e655e7",
        name: "Nicola",
        email: "nicola@schulze-sulingen.de",
        emailNotifications: "true"
      };

      if (userData.emailNotifications === "true") {
        var userInformation = {
          userName: userData.name,
          userMail: userData.email,
          pooleventName: applicationData.data[0].poolevent_id,
          applicationStatus: applicationData.data[0].state
        };
      }

      callback(null, userInformation);
    } else if (type === "NewEvent") {
      var filteredUsers = [];
      console.log("eventData");

      var eventData = await fetchEvent(typeId);
      var poolEvent = eventData.data;
      console.log(poolEvent);

      var asp = poolEvent.asp;

      //   var user = await fetchUser(asp);

      var user = {
        data: [
          {
            name: "Nicola",
            email: "nicola@schulze-sulingen.de",
            profiles: [
              {
                supporter: {
                  address: [
                    {
                      zip: 10365,
                      city: "Berlin"
                    }
                  ]
                }
              }
            ]
          }
        ]
      };
      console.log(user.data);

      // for (var j = 0; j < users.data.length; j++) {
      //   // users.data.forEach(user => {
      //   users.data[j].chosen = false;

      //   //Awareness Pipeline: Recomendations
      //   //Von Suggesty
      //   //--------------------------------
      //   // const recommendedEvents = await fetchRecommendedEvents("code");
      //   const recommendedEvents = [];
      //   recommendedEvents.data = [];

      //   for (var x = 0; x < recommendedEvents.data.length; x++) {
      //     if (poolEvent.id == recommendedEvents.data[x].actionId) {
      //       var poolEventFavoriteArtistName =
      //         recommendedEvents.data[x].artistName;

      //       var userInformation = {
      //         userName: users.data[j].name,
      //         userMail: users.data[j].email,
      //         pooleventName: poolEvent.name,
      //         reason: "Recommendation",
      //         poolEventFavoriteArtist: poolEventFavoriteArtistName
      //       };
      //       filteredUsers.push(userInformation);
      //       console.log("LOC: ", users.data[j].name);
      //       users.data[j].chosen = true;
      //     }
      //   }
      //   //Awareness Pipeline: Distance
      //   //Get all Users in 500 km Radius
      //   //--------------------------------
      //   if (users.data[j].chosen !== true) {
      //     var userZip = users.data[j].profiles[0].supporter.address[0].zip;
      //     var userCity = users.data[j].profiles[0].supporter.address[0].city;

      //     const result = await getLongLat(userZip + " " + userCity);
      //     var userGeo = {
      //       latitude: result.latitude,
      //       longitude: result.longitude
      //     };
      //     console.log("User: ", result);

      //     if (
      //       typeof poolEvent.location.latitude === "undefined" ||
      //       typeof poolEvent.location.longitude === "undefined"
      //     ) {
      //       return true;
      //     }
      //     var poolEventGeo = {
      //       latitude: poolEvent.location.latitude,
      //       longitude: poolEvent.location.longitude
      //     };

      //     const distance = geolib.getDistance(poolEventGeo, userGeo);
      //     const distanceInKm = distance / 1000;
      //     console.log(distanceInKm);
      //     if (distanceInKm <= 500) {
      //       var userInformation = {
      //         userName: users.data[j].name,
      //         userMail: users.data[j].email,
      //         pooleventName: poolEvent.event_name,
      //         reason: "Distance",
      //         region: poolEvent.location.locality
      //       };
      //       filteredUsers.push(userInformation);
      //       console.log("LOC: ", users.data[j].name);
      //       users.data[j].chosen = true;
      //     }
      //   }
      // }
      var userInformation = {
        userName: user.data[0].name,
        userMail: user.data[0].email,
        pooleventName: poolEvent.event_name,
        reason: "ASP",
        region: poolEvent.location.locality
      };
      callback(null, userInformation);

      // } else if (type === "ChangedEvent") {
      //   var filteredUsers = [];
      //   console.log("eventData");

      //   var eventData = await fetchEvent(typeId);
      //   var poolEvent = eventData.data;
      //   console.log(poolEvent);

      //Wer is ASP

      //Von Wem Favorisiert

      //Wer Beworben
    }
  } catch (error) {
    callback("PROR " + error);
  }
};

const fetchApplication = async id => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/application/` + id);
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProfile = async access_token => {
  try {
    const oauth =
      process.env.ENV === "dev"
        ? process.env.OAUTH_DEV
        : process.env.OAUTH_PRODUCTION;
    const { data } = await Axios.get(
      `${oauth}/drops/oauth2/rest/profile?access_token=` + access_token
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const fetchEvent = async event => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/poolevent/` + event);
    return data;
  } catch (error) {
    throw error;
  }
};
