const Axios = require("axios");
const {
  getStatus,
  getLastSeen,
  updateLastSeen
} = require("../controller/notifyController");
const {getNewEvents} = require("../controller/eventController");
const {getCommentReactions} = require("../controller/commentController");

var NodeGeocoder = require("node-geocoder");
const geolib = require("geolib");
const var_dump = require("var_dump");
//var sortBy = require("array-sort-by");

const dateFormat = require("dateformat");

function getLongLat(userZipCity) {
  return new Promise(resolve => {
    var options = {
      provider: "google",
      httpAdapter: "https", // Default
      apiKey: process.env.GOOGLE_AUTH,
      formatter: null // 'gpx', 'string', ...
    };
    var geocoder = NodeGeocoder(options);
    geocoder.geocode(userZipCity).then(function (res) {
      var longLat = {longitude: res[0].longitude, latitude: res[0].latitude};
      resolve(longLat);
    });
  });
}

exports.notify = async (req, res) => {
  console.log("Get notifications!");
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        success: false,
        error: "unauthorized, access token required"
      });
    } else {
      //Get User Data
      var access_token = req.headers.authorization.replace("Bearer ", "");
      const p = await fetchProfile(access_token);
      var userZip = p.profiles[0].supporter.address[0].zip;
      var userCity = p.profiles[0].supporter.address[0].city;
      var userId = p.id;

      const result = await getLongLat(userZip + " " + userCity);
      var userGeo = {
        latitude: result.latitude,
        longitude: result.longitude
      };
      console.log("User: ", result);

      var poolEvents = [];

      //First step: Get interesting new Events for user
      //-----------------------------------------------
      var filteredEventsReturn = await getNewEvents(userGeo);
      var filteredEvents = filteredEventsReturn.filteredEvents;
      //console.log(filteredEvents);
      var filteredEventsSec = filteredEventsReturn.filteredEventsSec;
      //console.log(filteredEventsSec);

      // var_dump(filteredEvents);

      var filteredComment = await getCommentReactions(userId);

      // var_dump(filteredComment);

      // var config = await {
      //   headers: { Authorization: `Bearer `, access_token }
      // };
      // var_dump(config);



/* entfernt
      var applications = await fetchApplications(userId);
      // var_dump(applications);
      var filteredApplications = [];
      var eventsOfInterest = [];

      applications.data.forEach(application => {
        if (
          application.state === "ACCEPTED" ||
          application.state === "REJECTED"
        ) {
          application.Microservice = "WAVES.Application";
          application.notifyParameters = {
            type: "application",
            typeId: application.id,
            poolEventName: application.poolevent_id,
            applicationState: application.state,
            applicationDate: application.created_at
          };
          filteredApplications.push(application);
          console.log("APP: ", application.poolevent_id);
        }

        if (application.state !== "REJECTED") {
          eventsOfInterest.push(application.poolevent_id);
          console.log("INTEREST: ", application.poolevent_id);
        }
      });

      var favorites = await fetchFavorites(userId);
      // var_dump(favorites);
      favorites.data.forEach(favorite => {
        eventsOfInterest.push(favorite.poolevent_id);
        console.log("INTEREST: ", favorite.poolevent_id);
      });

      //   var organized = await fetchAsps(userId);
      //   organized.data.forEach(organize => {
      //     eventsOfInterest.push(organize.id);
      //     resposibleForApplications.push(organize.id);
      // });

      var filteredNews = [];

      for (var j = 0; j < eventsOfInterest.length; j++) {
        const event = await fetchEvent(eventsOfInterest[j]);
        const comments = await fetchComments(eventsOfInterest[j]);

        if (comments.data.length > 0) {
          if (comments.data.length > 1) {
            var mostRecentDate = new Date(
              Math.max.apply(
                null,
                comments.data.map(e => {
                  return new Date(e.created_at);
                })
              )
            );
            var latest = comments.data.filter(e => {
              var d = new Date(e.created_at);
              return d.getTime() == mostRecentDate.getTime();
            })[0];
          } else {
            latest = comments.data;
          }

          if (event.data[0].edited_at > event.data[0].created_at) {
            if (latest.created_at < event.data[0].edited_at) {
              event.data[0].notifyParameters = {
                type: "news",
                typeId: event.data[0].id,
                newsType: "CHANGE",
                newsDate: event.data[0].edited_at,
                poolEventName: event.data[0].name
              };
              event.data[0].created_at = event.data[0].edited_at;
              event.data[0].Microservice = "WAVES.News";

              filteredNews.push(event.data[0]);
              console.log("NEWS : ", event.data[0].id);
            }
          } else {
            event.data[0].notifyParameters = {
              type: "news",
              typeId: event.data[0].id,
              newsType: "NEW COMMENT",
              newsDate: latest.created_at,
              poolEventName: event.data[0].name
            };
            event.data[0].created_at = latest.created_at;
            event.data[0].Microservice = "WAVES.News";

            filteredNews.push(event.data[0]);
            console.log("NEWS : ", event.data[0].id);
          }
        }
      }
*/
      //Check with Database (What has user already seen)
      //------------------------------------------------

      var poolEventStatus;
      var promises = [];
      var poolEventLastSeen;

      /* entfernt

      filteredApplications.forEach(application => {
        var promise = getStatus("application", userId, application.id).then(
          poolEventStatusResult => {
            poolEventStatus =
              poolEventStatusResult.length > 0
                ? poolEventStatusResult[0].status
                : "new"; //resp from array to string

            console.log("StatusA1", poolEventStatus);

            if (poolEventStatus === "deleted") {
              return;
            }

            var notify = {
              notifyMicroservice: application.Microservice,
              notifyCreatedAt: application.created_at,
              notifyPrimaryActionLink: "#",
              notifyStatus: poolEventStatus,
              notifyParameters: application.notifyParameters,
              notifyType: "DATE"
            };

            poolEvents.push(notify);
          }
        );
        promises.push(promise);
      });

      filteredComment.forEach(comment => {
        var promise = getLastSeen("comment", userId, comment.id).then(
          poolEventDateResult => {
            if (poolEventDateResult.length <= 0) {
              //post poolevent.lastseen = currentTime()
              console.log("new: comment", comment.id);
              updateLastSeen(
                "comment",
                userId,
                comment.id,
                (error, complete) => {
                  // console.log(error, complete);
                }
              );
            } else {
              poolEventLastSeen = poolEventDateResult[0].date;
              poolEventStatus = poolEventDateResult[0].status;

              console.log("last: comment", comment.id, poolEventLastSeen);
              console.log("stat: comment", comment.id, poolEventStatus);

              if (poolEventLastSeen < comment.created_at) {
                poolEventStatus = "new";
              } else if (poolEventStatus === "deleted") {
                return;
              }

              var notify = {
                notifyMicroservice: comment.Microservice,
                notifyCreatedAt: comment.created_at,
                notifyPrimaryActionLink: "#",
                notifyStatus: poolEventStatus,
                notifyParameters: comment.notifyParameters,
                notifyType: "MESSAGE"
              };
              poolEvents.push(notify);
            }
          }
        );
        promises.push(promise);
      });

      filteredNews.forEach(news => {
        var promise = getLastSeen("news", userId, news.id).then(
          poolEventDateResult => {
            if (poolEventDateResult.length <= 0) {
              //post poolevent.lastseen = currentTime()
              console.log("new news: ", news.id);
              updateLastSeen("news", userId, news.id, (error, complete) => {
                // console.log(error, complete);
              });
            } else {
              poolEventLastSeen = poolEventDateResult[0].date;
              poolEventStatus = poolEventDateResult[0].status;

              var update = new Date(news.created_at);

              // console.log("last news: ", news.id, poolEventLastSeen.getTime());
              // console.log("change news: ", news.id, update.getTime());
              console.log("stat news: ", news.id, poolEventStatus);

              if (poolEventLastSeen.getTime() < update.getTime()) {
                // updateLastSeen(
                //   "news",
                //   userId,
                //   news.id,
                //   (error, complete) => {
                //     console.log(error, complete);
                //   }
                // );
                console.log("change ");

                poolEventStatus = "new";
              } else if (poolEventStatus === "deleted") {
                return;
              }

              var notify = {
                notifyMicroservice: news.Microservice,
                notifyCreatedAt: news.created_at,
                notifyPrimaryActionLink: "",
                notifyStatus: poolEventStatus,
                notifyParameters: news.notifyParameters,
                notifyType: "MESSAGE"
              };

              poolEvents.push(notify);
            }
          }
        );
        promises.push(promise);
      });
 */

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

            var notify = {
              notifyMicroservice: poolEvent.Microservice,
              notifyCreatedAt: poolEvent.created_at,
              notifyPrimaryActionLink: "#",
              notifyStatus: poolEventStatus,
              notifyParameters: poolEvent.notifyParameters,
              notifyType: "ACTION"
            };


            // var_dump(notify);

            poolEvents.push(notify);
          }
        );
        promises.push(promise);
      });



      filteredEventsSec.forEach(poolEvent => {
        console.log("filteredEventsSecForEach");
        var promise = getStatus("eventSec", userId, poolEvent.id).then(
          poolEventStatusResult => {
            poolEventStatus =
              poolEventStatusResult.length > 0
                ? poolEventStatusResult[0].status
                : "new"; //resp from array to string

            console.log("Status1Sec", poolEventStatus);

            if (poolEventStatus === "deleted") {
              return;
            }

            var notify = {
              notifyMicroservice: poolEvent.Microservice,
              notifyCreatedAt: poolEvent.created_at,
              notifyPrimaryActionLink: "#",
              notifyStatus: poolEventStatus,
              notifyParameters: poolEvent.notifyParameters,
              notifyType: "ACTION"
            };


            // var_dump(notify);

            poolEvents.push(notify);

          }
        );
        promises.push(promise);
      });



      Promise.all(promises).then(() => {

        var poolEventsFinal = [];
        for (var x = 0; x < poolEvents.length; x++) {

          poolEvents[x].notifyActions = [];

          var placeholderAction = {};
          placeholderAction.actionButton = "Details";
          placeholderAction.actionLink = "#";
          poolEvents[x].notifyActions.push(placeholderAction);

          var placeholderAction2 = {};
          placeholderAction2.actionButton = "Bewerbung";
          placeholderAction2.actionLink = "#";
          poolEvents[x].notifyActions.push(placeholderAction2);

/*
          // placeholder actions
          if (x % 2 == 0) {
            poolEvents[x].notifyActions = [];
            var placeholderAction = {};
            placeholderAction.actionButton = "button name1";
            placeholderAction.actionLink = "https://www.googl1.de";
            poolEvents[x].notifyActions.push(placeholderAction);

            var placeholderAction2 = {};
            placeholderAction2.actionButton = "button name2";
            placeholderAction2.actionLink = "https://www.googl2.de";
            poolEvents[x].notifyActions.push(placeholderAction2);
          }
          */

          //if(today < new Date (poolEvents[x].notifyValidUntil)){
          var poolEvent = poolEvents[x];

          var now = new Date();
          var secondDate = new Date(poolEvents[x].notifyCreatedAt);
          var timeDifference = Math.abs(now.getTime() - secondDate.getTime());
          let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
         // differentDays=differentDays-1;
          differentDays=differentDays-28;
           console.log("TIME differentDays " + differentDays);

          // poolEvent.notifyCreatedAt = dateFormat(new Date(poolEvents[x].notifyCreatedAt), "dd.mm.yyyy h:MM:ss");
          poolEvent.notifyCreatedAt = differentDays;
          poolEventsFinal.push(poolEvent);
          // poolEventsFinal[x].notifyValidUntil = dateFormat(new Date(poolEventsFinal[x].notifyValidUntil), "h:MM:ss dd.mm.yyyy");
          //}


        }

        poolEventsFinal.sort(function (a, b) {
          return parseInt(a.notifyCreatedAt) - parseInt(b.notifyCreatedAt);
        });


        res.json(poolEventsFinal);

        //sortBy(poolEvents, s => -new Date(s.notifyCreatedAt));
        // var_dump(poolEvents);
        // res.json(poolEvents);
      });
    }
  } catch (error) {
    console.log("Error in getNotifications: ", error);
  }
};

exports.authenticate = async (req, res) => {

  try {
    const {code, state} = req.query;
   // console.log(code);
    const s = await fetchToken(code);
    //console.log(s);

    const p = await fetchProfile(s.access_token);
    //console.log(p);

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

    let res = await Axios.get(`https://stage.vivaconagua.org/drops/oauth2/access_token?grant_type=authorization_code&client_id=notify&code=${code}&redirect_uri=http://localhost:8005/v1/events/oauth`);
    /*
    const { data } = await Axios.get(
      `https://stage.vivaconagua.org/drops/oauth2/access_token?grant_type=authorization_code&client_id=notify&code=${code}&redirect_uri=http://localhost:8005/v1/events/oauth`
    );
    */
    console.log(res);
    // return data;
    return res.data;
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


const fetchApplications = async config => {
  try {
    const {data} = await Axios.get(
      "http://localhost:5000/waves/api/v1/application/user/" + config,
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchFavorites = async config => {
  try {
    const {data} = await Axios.get(
      "http://localhost:5000/waves/api/v1/favorite/user/" + config,
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchComments = async event => {
  try {
    const {data} = await Axios.get(
      "http://localhost:5000/waves/api/v1/comment/" + event
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchEvent = async event => {
  try {
    const {data} = await Axios.get(
      "http://localhost:5000/waves/api/v1/poolevent/notify/" + event
    );
    return data;
  } catch (error) {
    throw error;
  }
};

exports.receiveToken = (req, res) => {
  res.json({});
};
