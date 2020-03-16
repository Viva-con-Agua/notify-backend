const Axios = require("axios");

exports.getApplicationsAndNews = async userId =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Get new application changes!");

      var applications = await fetchApplications(userId);
      // console.log(applications);
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
          console.log("AddedApplication ", application.poolevent_id);
        }

        if (application.state !== "REJECTED") {
          eventsOfInterest.push(application.poolevent_id);
          console.log(
            "To EventsOfInterest ",
            application.poolevent_id,
            "APPLICATION"
          );
        }
      });

      var favorites = await fetchFavorites(userId);
      // var_dump(favorites);
      favorites.data.forEach(favorite => {
        eventsOfInterest.push(favorite.poolevent_id);
        console.log("To EventsOfInterest ", favorite.poolevent_id, "FAVORITE");
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
              console.log("AddedNEWS  ", event.data[0].id, "CHANGE");
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
            console.log("AddedNEWS  ", event.data[0].id, "COMMENT");
          }
        }
      }
      console.log("filteredApplications");

      resolve([filteredApplications, filteredNews]);
    } catch (error) {
      reject(error);
    }
  });

const fetchApplications = async config => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(
      `${waves_api}/application/user/` + config,
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchFavorites = async config => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(
      `${waves_api}/favorite/user/` + config,
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchComments = async event => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/comment/` + event);
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
    const { data } = await Axios.get(`${waves_api}/poolevent/notify/` + event);
    return data;
  } catch (error) {
    throw error;
  }
};
