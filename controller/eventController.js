const Axios = require("axios");
const geolib = require("geolib");
const dateFormat = require("dateformat");


exports.getNewEvents = async (userGeo, callback) => {
  // new Promise((resolve, reject) => {
  try {


    const events = await fetchEvents("code");
    const recommendedEvents = await fetchRecommendedEvents("code");

    console.log(recommendedEvents);
    //console.log(events);

    var filteredEvents = [];
    var filteredEventsSec = [];

    events.data.forEach(poolEvent => {

      var date = new Date();
      const last2 = addDays(date, 40);
      //const last2 = addDays(date, 20);

      var dAppEnd = new Date(poolEvent.application_end);
      var dLast2 = new Date(last2);

      var needsSupporter = poolEvent.applications < (poolEvent.supporter_lim - 3);
      var endsSoon = dLast2 > dAppEnd;

      var poolEventGeo = {
        latitude: poolEvent.latitude,
        longitude: poolEvent.longitude
      };

      const distance = geolib.getDistance(poolEventGeo, userGeo);
      const distanceInKm = distance / 1000;

      if (!endsSoon) {

        //Awareness Pipeline: Recomendations
        //Von Suggesty
        //--------------------------------
        for (var x = 0; x < recommendedEvents.data.length; x++) {
          if (poolEvent.id == recommendedEvents.data[x].actionId && distanceInKm<=300) {
            var poolEventFavoriteArtistName = recommendedEvents.data[x].artistName;
            var poolEventRecursionDepth = recommendedEvents.data[x].recursionDepth;
            var poolEventArtistHeuristicName = recommendedEvents.data[x].artistHeuristicName;






            poolEvent.Microservice = "SUGGESTY";
            poolEvent.notifyParameters = {
              type: "event",
              typeId: poolEvent.id,
              poolEventName: poolEvent.name,
              poolEventCity: poolEvent.locality,
              poolEventSupporterLim: poolEvent.supporter_lim,
              poolEventFullAddress: poolEvent.full_address,
              poolEventVcaActivities: "Sammeln von Pfandbechern und Organisieren von Informationsständen",
              poolEventApplicationEndDate: dateFormat(new Date(poolEvent.application_end), "dd.mm.yyyy"),
              poolEventApplicationEndTime: dateFormat(new Date(poolEvent.application_end), "hh:MM:ss"),
              poolEventDate: dateFormat(new Date(poolEvent.event_start), "dd.mm.yyyy"),
              poolEventTime: dateFormat(new Date(poolEvent.event_start), "hh:MM:ss"),
              poolEventFavoriteArtist: poolEventFavoriteArtistName,
              poolEventRecursionDepth: poolEventRecursionDepth,
              poolEventArtistHeuristicName: poolEventArtistHeuristicName
            };
            filteredEvents.push(poolEvent);
            //console.log("SUC: ", poolEvent.name);
            poolEvent.chosen = true;
          }
        }
      }

      if (poolEvent.chosen !== true && !endsSoon) {
        //Awareness Pipeline: Distance
        //Get all Events in 150 km Radius
        //--------------------------------
        if (
          typeof poolEvent.latitude === "undefined" ||
          typeof poolEvent.longitude === "undefined"
        ) {
          return true;
        }


        if (distanceInKm <= 150) {
          poolEvent.Microservice = "WAVES.Distance";
          poolEvent.notifyParameters = {
            poolEventSupporterLim: poolEvent.supporter_lim,
            poolEventFullAddress: poolEvent.full_address,
            poolEventVcaActivities: "Sammeln von Pfandbechern",
            poolEventApplicationEndDate: dateFormat(new Date(poolEvent.application_end), "dd.mm.yyyy"),
            poolEventApplicationEndTime: dateFormat(new Date(poolEvent.application_end), "hh:MM:ss"),
            type: "event",
            typeId: poolEvent.id,
            poolEventName: poolEvent.name,
            poolEventCity: poolEvent.locality,
            poolEventDate: dateFormat(new Date(poolEvent.event_start), "dd.mm.yyyy"),
            poolEventTime: dateFormat(new Date(poolEvent.event_start), "hh:MM:ss"),
            poolEventDistanceKm: distanceInKm
          };
          filteredEvents.push(poolEvent);
         // console.log("LOC: ", poolEvent.name);
          poolEvent.chosen = true;
        }
      }


      //if (poolEvent.chosen !== true || false) {
        if (endsSoon) {
        //Awareness Pipeline: Necessity
        //Get all Events with number_of_applications < (supp_lim -3) AND application_end < 5 days in the future
        //--------------------------------


       // console.log(poolEvent.name);
        //console.log("needsSupporter", needsSupporter);
       // console.log("endsSoon", endsSoon);

       // console.log(dLast2, "last2");
       // console.log(dAppEnd, "poolEvent.application_end");


        if (needsSupporter && endsSoon) {
          poolEvent.Microservice = "WAVES.Necessity";
          poolEvent.notifyParameters = {
            poolEventSupporterLim: poolEvent.supporter_lim,
            poolEventFullAddress: poolEvent.full_address,
            poolEventVcaActivities: "Sammeln von Pfandbecher",
            poolEventApplicationEndDate: dateFormat(new Date(poolEvent.application_end), "dd.mm.yyyy"),
            poolEventApplicationEndTime: dateFormat(new Date(poolEvent.application_end), "hh:MM:ss"),
            type: "eventSec",
            typeId: poolEvent.id,
            poolEventName: poolEvent.name,
            poolEventCity: poolEvent.locality,
            poolEventDate: dateFormat(new Date(poolEvent.event_start), "dd.mm.yyyy"),
            poolEventTime: dateFormat(new Date(poolEvent.event_start), "hh:MM:ss"),
            poolEventApplicationEnd: poolEvent.application_end
          };
          filteredEventsSec.push(poolEvent);
         // console.log("NEC: ", poolEvent.name);
          poolEvent.chosen = true;

        }
      }
    });


    var returnValue = {};
    returnValue.filteredEvents = filteredEvents;
    returnValue.filteredEventsSec = filteredEventsSec;

    //console.log(filteredEvents);
    //console.log("---");
    //console.log(filteredEventsSec);


    return returnValue;
    //return filteredEvents;
  } catch (error) {
    console.log(error);
  }
};

function addDays(date, days) {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
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

const fetchRecommendedEvents = async code => {
  try {
    const {data} = await Axios.get(
      `http://localhost:5001/suggesty/api/v1/spotify/suggestion/user/a1f198b5-09f0-4271-b3b3-89e4a0e655e7`
    );

    return data;
  } catch (error) {
    throw error;
  }
};
