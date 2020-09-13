const Axios = require("axios");
const {
  getStatus,
  getLastSeen,
  updateLastSeen,
} = require("../controller/databaseController");
const { getNewEvents } = require("../controller/eventController");
const { getCommentReactions } = require("../controller/commentController");
const {
  getApplicationsAndNews,
} = require("../controller/applicationController");

var NodeGeocoder = require("node-geocoder");
var sortBy = require("array-sort-by");

var dateFormat = require("dateformat");
const e = require("express");

exports.notify = async (req, res) => {
  try {
    console.log("Get notifications?????!");

    // if (!req.headers.authorization) {
    //   res.status(400).json({
    //     success: false,
    //     error: "unauthorized, access token required",
    //   });
    // } else {
    //   //Get User Data
    //   var access_token = req.headers.authorization.replace("Bearer ", "");
    //   const p = await fetchProfile(access_token, res);

    //   var userZip = p.profiles[0].supporter.address[0].zip;
    //   var userCity = p.profiles[0].supporter.address[0].city;
    //   var userId = p.id;

    //   const result = await getLongLat(userZip + " " + userCity);
    //   var userGeo = {
    //     latitude: result.latitude,
    //     longitude: result.longitude,
    //   };
    //   console.log("UserGeo: ", result);

    var notifications = [];
    var promises = [];
    var listPromises = [];

    var mongoFinished = global.conn
      .collection("notifications")
      .find({ Microservice: "WAVES" })
      .toArray();

    listPromises.push(mongoFinished);

    // var db = await global.conn
    //   .collection("notifications")
    //   .find({})
    //   .toArray(function (err, docs) {
    //     console.log("retrieved records:");
    //     console.log(docs);
    //   });
    // var cursor = await global.conn.collection("notifications").find({});

    // cursor.count(function (err, count) {
    //   console.log("Total matches: " + count);
    // });
    // console.log(notifyarray);

    //Step 1: Events, Comment Reactions, Application Changes, News in EventsOfInterest for User
    //---------------------------------------------------------------------------------------------
    // var eventsFinished = getNewEvents(userGeo);

    // listPromises.push(eventsFinished);

    // var commentsFinished = getCommentReactions(userId);
    // listPromises.push(commentsFinished);

    // var applicationsFinished = getApplicationsAndNews(userId);
    // listPromises.push(applicationsFinished);

    //Step 2: Check with Database (What has user already seen)
    //------------------------------------------------
    // var poolEventStatus;
    // var poolEventLastSeen;

    mongoFinished.then(function (wavesNotifications) {
      wavesNotifications.forEach((not) => {
        if (not.type == "event") {
          var notify = {
            notifyMicroservice: not.Microservice,
            notifyCreatedAt: not.date,
            notifyLink: "#",
            notifyStatus: "new",
            notifyParameters: not.layoutParameters,
            notifyType: "ACTION",
          };
          notifications.push(notify);
        }
        if (not.type == "application") {
          var notify = {
            notifyMicroservice: not.Microservice + "." + not.type,
            notifyCreatedAt: not.date,
            notifyLink: "#",
            notifyStatus: "new",
            notifyParameters: not.layoutParameters,
            notifyType: "DATE",
          };
          notifications.push(notify);
        }
        if (not.type == "comment") {
          var notify = {
            notifyMicroservice: not.Microservice + "." + not.type,
            notifyCreatedAt: not.date,
            notifyLink: "#",
            notifyStatus: "new",
            notifyParameters: not.layoutParameters,
            notifyType: "MESSAGE",
          };
          notifications.push(notify);
        }
        global.conn
          .collection("filter")
          .find({ Microservice: "WAVES" })
          .toArray()
          .then(function (filter) {
            user = {
              id: "4a74141e-c2c0-46a0-9c0c-84bef8be7d0f",
              invested: [458, 469, 461, 459],
            };
            // not.forEach((not) => {
            console.log("=============");

            console.log("NOT-Type: " + not.type);

            // if (not.type == "application") {
            filter.forEach((filter) => {
              // console.log(not.matchingParameters);
              console.log("Filter-Type: " + filter.type);

              if (filter.type == not.type) {
                if (filter.filter_operator == "==") {
                  console.log("OP: " + filter.filter_operator);

                  var firstParameter = filter.filter_matchingParameter;
                  var secondParameter = filter.filter_userParameter;

                  console.log(
                    "FirstPara: " + not.matchingParameters[firstParameter]
                  );
                  console.log("SecondPara: " + user[secondParameter]);

                  if (
                    not.matchingParameters[firstParameter] ==
                    user[secondParameter]
                  ) {
                    console.log("MATCH");
                  }
                } else if (filter.filter_operator == "IN") {
                  console.log("OP: " + filter.filter_operator);

                  var firstParameter = filter.filter_matchingParameter;
                  var secondParameter = filter.filter_userParameter;

                  console.log(not.matchingParameters);
                  console.log(
                    "FirstPara: " + not.matchingParameters[firstParameter]
                  );
                  console.log("SecondPara: " + user[secondParameter]);

                  if (
                    user[secondParameter].includes(
                      not.matchingParameters[firstParameter]
                    )
                  ) {
                    console.log("MATCH");
                  }
                } else if (filter.filter_operator == "<") {
                  console.log("OP: " + filter.filter_operator);

                  var firstParameter = filter.filter_matchingParameter;
                  var secondParameter = filter.filter_userParameter;

                  console.log(
                    "FirstPara: " + not.matchingParameters[firstParameter]
                  );
                  console.log("SecondPara: " + secondParameter);

                  if (
                    not.matchingParameters[firstParameter] < secondParameter
                  ) {
                    console.log("MATCH");
                  }
                }
              }
            });
            // }
          });
      });
    });

    // eventsFinished.then(
    //   function (filteredEvents) {
    //     if (filteredEvents.length > 0) {
    //       filteredEvents.forEach((poolEvent) => {
    //         var promise = getStatus("event", userId, poolEvent.id).then(
    //           (poolEventStatusResult) => {
    //             poolEventStatus =
    //               poolEventStatusResult.length > 0
    //                 ? poolEventStatusResult[0].status
    //                 : "new"; //resp from array to string

    //             console.log(
    //               "PooleventStatus: ",
    //               poolEventStatus,
    //               poolEvent.name
    //             );

    //             if (poolEventStatus === "deleted") {
    //               return;
    //             }

    //             var notify = {
    //               notifyMicroservice: poolEvent.Microservice,
    //               notifyCreatedAt: poolEvent.created_at,
    //               notifyLink: "#",
    //               notifyStatus: poolEventStatus,
    //               notifyParameters: poolEvent.notifyParameters,
    //               notifyType: "ACTION",
    //             };

    //             // var_dump(notify);

    //             notifications.push(notify);
    //           }
    //         );
    //         promises.push(promise);
    //       });
    //     } else {
    //       console.log("no events");
    //     }
    //   },
    //   function (error) {
    //     console.log("error");
    //     // throw new Error("hello");
    //     // throw error;
    //     // Promise.reject(error);
    //     res.status(400).send({
    //       message: "Connection to Event Database not possible",
    //     });
    //   }
    // );
    // .catch(function (error) {
    //   res.status(400).send({
    //     message: "Connection to Event Database not possible",
    //   });
    // });

    // commentsFinished.then((filteredComment) => {
    //   if (filteredComment.length > 0) {
    //     filteredComment.forEach((comment) => {
    //       var promise = getLastSeen("comment", userId, comment.id).then(
    //         (poolEventDateResult) => {
    //           if (poolEventDateResult.length <= 0) {
    //             //post poolevent.lastseen = currentTime()
    //             console.log("new: comment", comment.id);
    //             updateLastSeen(
    //               "comment",
    //               userId,
    //               comment.id,
    //               "deleted",
    //               (error, complete) => {
    //                 // console.log(error, complete);
    //               }
    //             );
    //           } else {
    //             poolEventLastSeen = poolEventDateResult[0].date;
    //             poolEventStatus = poolEventDateResult[0].status;

    //             console.log("Commentstatus ", comment.id, poolEventStatus);
    //             // console.log("stat: comment", comment.id, poolEventStatus);

    //             if (poolEventLastSeen < comment.created_at) {
    //               poolEventStatus = "new";
    //               updateLastSeen(
    //                 "comment",
    //                 userId,
    //                 comment.id,
    //                 "new",
    //                 (error, complete) => {
    //                   // console.log(error, complete);
    //                 }
    //               );
    //             } else if (poolEventStatus === "deleted") {
    //               return;
    //             }

    //             var notify = {
    //               notifyMicroservice: comment.Microservice,
    //               notifyCreatedAt: comment.created_at,
    //               notifyLink: "#",
    //               notifyStatus: poolEventStatus,
    //               notifyParameters: comment.notifyParameters,
    //               notifyType: "MESSAGE",
    //             };
    //             notifications.push(notify);
    //           }
    //         }
    //       );
    //       promises.push(promise);
    //     });
    //   }
    // }),
    //   function (error) {
    //     res.status(400).send({
    //       message: "Connection to Comment Database not possible",
    //     });
    //   };

    // applicationsFinished.then(([filteredApplications, filteredNews]) => {
    //   if (filteredApplications.length > 0) {
    //     filteredApplications.forEach((application) => {
    //       var promise = getStatus("application", userId, application.id).then(
    //         (poolEventStatusResult) => {
    //           poolEventStatus =
    //             poolEventStatusResult.length > 0
    //               ? poolEventStatusResult[0].status
    //               : "new"; //resp from array to string

    //           console.log(
    //             "ApplicationStatus",
    //             application.id,
    //             poolEventStatus
    //           );

    //           if (poolEventStatus === "deleted") {
    //             return;
    //           }

    //           var notify = {
    //             notifyMicroservice: application.Microservice,
    //             notifyCreatedAt: application.created_at,
    //             notifyLink: "#",
    //             notifyStatus: poolEventStatus,
    //             notifyParameters: application.notifyParameters,
    //             notifyType: "DATE",
    //           };

    //           notifications.push(notify);
    //         }
    //       );
    //       promises.push(promise);
    //     });

    //     filteredNews.forEach((news) => {
    //       var promise = getLastSeen("news", userId, news.id).then(
    //         (poolEventDateResult) => {
    //           if (poolEventDateResult.length <= 0) {
    //             //post poolevent.lastseen = currentTime()
    //             console.log("new news: ", news.id);
    //             updateLastSeen(
    //               "news",
    //               userId,
    //               news.id,
    //               "deleted",
    //               (error, complete) => {
    //                 // console.log(error, complete);
    //               }
    //             );
    //           } else {
    //             poolEventLastSeen = poolEventDateResult[0].date;
    //             poolEventStatus = poolEventDateResult[0].status;

    //             var update = new Date(news.created_at);

    //             // console.log("last news: ", news.id, poolEventLastSeen.getTime());
    //             // console.log("change news: ", news.id, update.getTime());
    //             console.log("Newsstatus: ", news.id, poolEventStatus);

    //             if (poolEventLastSeen.getTime() < update.getTime()) {
    //               updateLastSeen(
    //                 "news",
    //                 userId,
    //                 news.id,
    //                 "new",
    //                 (error, complete) => {
    //                   // console.log(error, complete);
    //                 }
    //               );
    //               console.log("change ");

    //               poolEventStatus = "new";
    //             } else if (poolEventStatus === "deleted") {
    //               return;
    //             }

    //             var notify = {
    //               notifyMicroservice: news.Microservice,
    //               notifyCreatedAt: news.created_at,
    //               notifyLink: "#",
    //               notifyStatus: poolEventStatus,
    //               notifyParameters: news.notifyParameters,
    //               notifyType: "MESSAGE",
    //             };

    //             notifications.push(notify);
    //           }
    //         }
    //       );
    //       promises.push(promise);
    //     });
    //   }
    // }),
    //   function (error) {
    //     res.status(400).send({
    //       message: "Connection to Application Database not possible",
    //     });
    //   };

    Promise.all(listPromises).then(() => {
      Promise.all(promises).then(() => {
        console.log("FIN");
        sortBy(notifications, (s) => -new Date(s.notifyCreatedAt));

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
        console.log(notifications);

        res.json(notificationsFinal);
      });
    });
    // }
  } catch (error) {
    console.log(error);
    // Promise// res.status(error.status).send({ message: error.send });
    console.log(
      "Error in getNotifications: ",
      error.message
      // error.function,
      // error.status,
      // error.message
    );

    res.status(400).send({
      message: error.message,
    });
  }
};

function getLongLat(userZipCity) {
  return new Promise((resolve) => {
    // var options = {
    //   provider: "google",
    //   httpAdapter: "https", // Default
    //   apiKey: process.env.GOOGLE_AUTH,
    //   formatter: null, // 'gpx', 'string', ...
    // };

    var options = {
      provider: "opencage",
      httpAdapter: "https",
      apiKey: "68abc0e17ce54ede8b5ea7d267c34112",
      formatter: null,
    };

    var geocoder = NodeGeocoder(options);

    geocoder
      .geocode(userZipCity)
      .then(function (res) {
        var longLat = {
          longitude: res[0].longitude,
          latitude: res[0].latitude,
        };
        resolve(longLat);
      })
      .catch(function (error) {
        e.status = error.response.status;
        e.message = error.response;
        e.function = "getLongLat";
        return Promise.reject(e);
      });
  });
}

const fetchProfile = async (access_token, res) => {
  console.log("FETCH PROFILE");
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
    // res.status(error.response.status).send({
    //   message: error.response.headers["www-authenticate"],
    // });
    var e = {
      status: error.response.status,
      message: error.response.headers["www-authenticate"],
      function: "fetchProfile",
    };

    // e.status = error.response.status;
    // e.message = error.response.headers["www-authenticate"];
    // e.function = "fetchProfile";
    return Promise.reject(e);
  }
};
