const Axios = require("axios");
const geolib = require("geolib");

exports.getNewEvents = async (userGeo, callback) => {
  // new Promise((resolve, reject) => {
  try {
    console.log("Get new poolevents!");

    const events = await fetchEvents("code");

    // const recommendedEvents = await fetchRecommendedEvents("code");
    const recommendedEvents = [];
    recommendedEvents.data = [];

    // var_dump(s.data);

    var filteredEvents = [];

    events.data.forEach(poolEvent => {
      //Awareness Pipeline: Necessity
      //Get all Events with number_of_applications < (supp_lim -3) AND application_end < 5 days in the future
      //--------------------------------
      var date = new Date();
      var last = date.getTime() - 5 * 24 * 60 * 60 * 1000;
      // console.log(
      //   "application_date soon: ",
      //   Date.parse(poolEvent.application_end) > last
      // );
      // console.log(
      //   "supporter neede: ",
      //   poolEvent.applications < poolEvent.supporter_lim - 3
      // );
      if (
        poolEvent.applications < poolEvent.supporter_lim - 3 &&
        Date.parse(poolEvent.application_end) > last
      ) {
        poolEvent.Microservice = "WAVES.Necessity";
        poolEvent.notifyParameters = {
          type: "event",
          typeId: poolEvent.id,
          poolEventName: poolEvent.name,
          poolEventCity: poolEvent.locality,
          poolEventDate: poolEvent.event_start,
          poolEventApplicationEnd: poolEvent.application_end
        };
        filteredEvents.push(poolEvent);
        console.log("NEC: ", poolEvent.name);
        poolEvent.chosen = true;
      }

      if (poolEvent.chosen !== true) {
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
          poolEvent.notifyParameters = {
            type: "event",
            typeId: poolEvent.id,
            poolEventName: poolEvent.name,
            poolEventCity: poolEvent.locality,
            poolEventDate: poolEvent.event_start,
            poolEventDistanceKm: distanceInKm
          };
          filteredEvents.push(poolEvent);
          console.log("LOC: ", poolEvent.name);
          poolEvent.chosen = true;
        }
      }

      if (poolEvent.chosen !== true) {
        //Awareness Pipeline: Recomendations
        //Von Suggesty
        //--------------------------------
        for (var x = 0; x < recommendedEvents.data.length; x++) {
          if (poolEvent.id == recommendedEvents.data[x].actionId) {
            var poolEventFavoriteArtistName =
              recommendedEvents.data[x].artistName;

            poolEvent.Microservice = "SUGGESTY";
            poolEvent.notifyParameters = {
              type: "event",
              typeId: poolEvent.id,
              poolEventName: poolEvent.name,
              poolEventCity: poolEvent.locality,
              poolEventDate: poolEvent.event_start,
              poolEventFavoriteArtist: poolEventFavoriteArtistName
            };
            filteredEvents.push(poolEvent);
            console.log("SUC: ", poolEvent.name);
            poolEvent.chosen = true;
          }
        }
      }
    });
    return filteredEvents;
  } catch (error) {
    console.log(error);
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
