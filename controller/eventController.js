const Axios = require("axios");
const geolib = require("geolib");
const dateFormat = require("dateformat");


exports.getNewEvents = async (userGeo, callback) => {
  // new Promise((resolve, reject) => {
  try {


    const events = await fetchEvents("code");

     const recommendedEvents = await fetchRecommendedEvents("code");

    console.log(recommendedEvents);


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
          poolEventDate: dateFormat(new Date(poolEvent.event_start), "dd.mm.yyyy"),
          poolEventTime: dateFormat(new Date(poolEvent.event_start), "hh:MM:ss"),
          poolEventApplicationEnd: poolEvent.application_end
        };
        filteredEvents.push(poolEvent);
        console.log("NEC: ", poolEvent.name);
        poolEvent.chosen = true;
      }

      if (poolEvent.chosen !== true) {
        //Awareness Pipeline: Recomendations
        //Von Suggesty
        //--------------------------------
        for (var x = 0; x < recommendedEvents.data.length; x++) {
          if (poolEvent.id == recommendedEvents.data[x].actionId) {
            console.log("Volltreffer");
            var poolEventFavoriteArtistName = recommendedEvents.data[x].artistName;
            var poolEventRecursionDepth = recommendedEvents.data[x].recursionDepth;
            var poolEventArtistHeuristicName = recommendedEvents.data[x].artistHeuristicName;

            poolEvent.Microservice = "SUGGESTY";
            poolEvent.notifyParameters = {
              type: "event",
              typeId: poolEvent.id,
              poolEventName: poolEvent.name,
              poolEventCity: poolEvent.locality,
              poolEventDate: dateFormat(new Date(poolEvent.event_start), "dd.mm.yyyy"),
              poolEventTime: dateFormat(new Date(poolEvent.event_start), "hh:MM:ss"),
              poolEventFavoriteArtist: poolEventFavoriteArtistName,
              poolEventRecursionDepth: poolEventRecursionDepth,
              poolEventArtistHeuristicName: poolEventArtistHeuristicName
            };
            filteredEvents.push(poolEvent);
            console.log("SUC: ", poolEvent.name);
            poolEvent.chosen = true;
          }
        }
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
            poolEventDate: dateFormat(new Date(poolEvent.event_start), "dd.mm.yyyy"),
            poolEventTime: dateFormat(new Date(poolEvent.event_start), "hh:MM:ss"),
            poolEventDistanceKm: distanceInKm
          };
          filteredEvents.push(poolEvent);
          console.log("LOC: ", poolEvent.name);
          poolEvent.chosen = true;
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

const fetchRecommendedEvents = async code => {
  try {
    const { data } = await Axios.get(
      `http://localhost:5001/suggesty/api/v1/spotify/suggestion/user/a1f198b5-09f0-4271-b3b3-89e4a0e655e7`
    );

    return data;
  } catch (error) {
    throw error;
  }
};
