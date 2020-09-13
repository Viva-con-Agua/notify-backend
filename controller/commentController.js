const Axios = require("axios");

exports.getCommentReactions = async (userId) => {
  try {
    console.log("Get new comment-reactions!");

    var filteredComment = [];
    var commented = await fetchUserComments(userId);
    for (var j = 0; j < commented.data.length; j++) {
      var votes = await fetchVotes(commented.data[j].id);
      var resps = await fetchResponses(commented.data[j].id);
      var reactions = votes.data.concat(resps.data);
      latest = 0;

      if (reactions.length > 0) {
        if (reactions.length > 1) {
          var mostRecentDate = new Date(
            Math.max.apply(
              null,
              reactions.map((e) => {
                return new Date(e.created_at);
              })
            )
          );
          var latest = reactions.filter((e) => {
            var d = new Date(e.created_at);
            return d.getTime() == mostRecentDate.getTime();
          })[0];
        } else {
          latest = reactions[0];
        }
        if (typeof latest.text === "undefined") {
          commented.data[j].notifyParameters = {
            type: "comment",
            typeId: commented.data[j].id,
            commentResponse: "NEW VOTE",
            responseDate: latest.created_at,
            responseUser: latest.full_name,
            poolEventName: commented.data[j].poolevent_name,
            commentDate: commented.data[j].created_at,
          };
          console.log("AddedComment", commented.data[j].id, "VOTE");
        } else {
          commented.data[j].notifyParameters = {
            type: "comment",
            typeId: commented.data[j].id,
            commentResponse: "NEW RESPONSE",
            responseDate: latest.created_at,
            responseUser: latest.full_name,
            responseText: latest.text,
            poolEventName: commented.data[j].poolevent_name,
            commentDate: commented.data[j].created_at,
          };
          console.log("AddedComment", commented.data[j].id, "RESPONSE");
        }
        commented.data[j].created_at = latest.created_at;
        commented.data[j].Microservice = "WAVES.Comment";

        filteredComment.push(commented.data[j]);
      }
    }
    console.log("filteredComment");

    return filteredComment;
  } catch (error) {
    e = new Error("Connection to Comment Database not possible");
    // console.log(error);
    return e;
  }
};

const fetchUserComments = async (user) => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/comment/user/` + user);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchVotes = async (comment) => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/vote/` + comment);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchResponses = async (comment) => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(
      `${waves_api}/comment/response/` + comment
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
