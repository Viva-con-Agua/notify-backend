const Axios = require("axios");
const {
  getStatus,
  getLastSeen,
  updateLastSeen
} = require("../controller/databaseController");
const { getNewEvents } = require("../controller/eventController");
const { getCommentReactions } = require("../controller/commentController");
const {
  getApplicationsAndNews
} = require("../controller/applicationController");

var NodeGeocoder = require("node-geocoder");
var sortBy = require("array-sort-by");

var dateFormat = require("dateformat");
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
      console.log("UserGeo: ", result);

      var notifications = [];
      var promises = [];
      var listPromises = [];

      //Step 1: Events, Comment Reactions, Application Changes, News in EventsOfInterest for User
      //---------------------------------------------------------------------------------------------
      var eventsFinished = getNewEvents(userGeo);
      listPromises.push(eventsFinished);

      var commentsFinished = getCommentReactions(userId);
      listPromises.push(commentsFinished);

      var applicationsFinished = getApplicationsAndNews(userId);
      listPromises.push(applicationsFinished);

      //Step 2: Check with Database (What has user already seen)
      //------------------------------------------------
      var poolEventStatus;
      var poolEventLastSeen;

      eventsFinished.then(filteredEvents => {
        filteredEvents.forEach(poolEvent => {
          var promise = getStatus("event", userId, poolEvent.id).then(
            poolEventStatusResult => {
              poolEventStatus =
                poolEventStatusResult.length > 0
                  ? poolEventStatusResult[0].status
                  : "new"; //resp from array to string

              console.log("PooleventStatus: ", poolEventStatus, poolEvent.name);

              if (poolEventStatus === "deleted") {
                return;
              }

              var notify = {
                notifyMicroservice: poolEvent.Microservice,
                notifyCreatedAt: poolEvent.created_at,
                notifyLink: "#",
                notifyStatus: poolEventStatus,
                notifyParameters: poolEvent.notifyParameters,
                notifyType: "ACTION"
              };

              // var_dump(notify);

              notifications.push(notify);
            }
          );
          promises.push(promise);
        });
      });

      commentsFinished.then(filteredComment => {
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
                  "deleted",
                  (error, complete) => {
                    // console.log(error, complete);
                  }
                );
              } else {
                poolEventLastSeen = poolEventDateResult[0].date;
                poolEventStatus = poolEventDateResult[0].status;

                console.log("Commentstatus ", comment.id, poolEventStatus);
                // console.log("stat: comment", comment.id, poolEventStatus);

                if (poolEventLastSeen < comment.created_at) {
                  poolEventStatus = "new";
                  updateLastSeen(
                    "comment",
                    userId,
                    comment.id,
                    "new",
                    (error, complete) => {
                      // console.log(error, complete);
                    }
                  );
                } else if (poolEventStatus === "deleted") {
                  return;
                }

                var notify = {
                  notifyMicroservice: comment.Microservice,
                  notifyCreatedAt: comment.created_at,
                  notifyLink: "#",
                  notifyStatus: poolEventStatus,
                  notifyParameters: comment.notifyParameters,
                  notifyType: "MESSAGE"
                };
                notifications.push(notify);
              }
            }
          );
          promises.push(promise);
        });
      });

      applicationsFinished.then(([filteredApplications, filteredNews]) => {
        filteredApplications.forEach(application => {
          var promise = getStatus("application", userId, application.id).then(
            poolEventStatusResult => {
              poolEventStatus =
                poolEventStatusResult.length > 0
                  ? poolEventStatusResult[0].status
                  : "new"; //resp from array to string

              console.log("ApplicationStatus", application.id, poolEventStatus);

              if (poolEventStatus === "deleted") {
                return;
              }

              var notify = {
                notifyMicroservice: application.Microservice,
                notifyCreatedAt: application.created_at,
                notifyLink: "#",
                notifyStatus: poolEventStatus,
                notifyParameters: application.notifyParameters,
                notifyType: "DATE"
              };

              notifications.push(notify);
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
                updateLastSeen(
                  "news",
                  userId,
                  news.id,
                  "deleted",
                  (error, complete) => {
                    // console.log(error, complete);
                  }
                );
              } else {
                poolEventLastSeen = poolEventDateResult[0].date;
                poolEventStatus = poolEventDateResult[0].status;

                var update = new Date(news.created_at);

                // console.log("last news: ", news.id, poolEventLastSeen.getTime());
                // console.log("change news: ", news.id, update.getTime());
                console.log("Newsstatus: ", news.id, poolEventStatus);

                if (poolEventLastSeen.getTime() < update.getTime()) {
                  updateLastSeen(
                    "news",
                    userId,
                    news.id,
                    "new",
                    (error, complete) => {
                      // console.log(error, complete);
                    }
                  );
                  console.log("change ");

                  poolEventStatus = "new";
                } else if (poolEventStatus === "deleted") {
                  return;
                }

                var notify = {
                  notifyMicroservice: news.Microservice,
                  notifyCreatedAt: news.created_at,
                  notifyLink: "#",
                  notifyStatus: poolEventStatus,
                  notifyParameters: news.notifyParameters,
                  notifyType: "MESSAGE"
                };

                notifications.push(notify);
              }
            }
          );
          promises.push(promise);
        });
      });

      Promise.all(listPromises).then(() => {
        Promise.all(promises).then(() => {
          console.log("FIN");
          sortBy(notifications, s => -new Date(s.notifyCreatedAt));

          var notificationsFinal = [];
          for (var x = 0; x < notifications.length; x++) {
            //if(today < new Date (poolEvents[x].notifyValidUntil)){
            var poolEvent = notifications[x];
            poolEvent.notifyCreatedAt = dateFormat(
              new Date(notifications[x].notifyCreatedAt),
              "dd.mm.yyyy h:MM:ss"
            );
            notificationsFinal.push(poolEvent);
            // poolEventsFinal[x].notifyValidUntil = dateFormat(new Date(poolEventsFinal[x].notifyValidUntil), "h:MM:ss dd.mm.yyyy");
            //}
          }

          res.json(notificationsFinal);
        });
      });
    }
  } catch (error) {
    console.log("Error in getNotifications: ", error);
  }
};

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

const fetchProfile = async access_token => {
  try {
    const oauth =
      process.env.ENV === "dev"
        ? process.env.OAUTH_DEV
        : process.env.OAUTH_PRODUCTION;
    console.log(oauth);
    const { data } = await Axios.get(
      `${oauth}/drops/oauth2/rest/profile?access_token=` + access_token
    );

    return data;
  } catch (error) {
    throw error;
  }
};
