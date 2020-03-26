const Axios = require("axios");

exports.getCommentReactions = async (userId, callback) => {
  // new Promise((resolve, reject) => {
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
              reactions.map(e => {
                return new Date(e.created_at);
              })
            )
          );
          var latest = reactions.filter(e => {
            var d = new Date(e.created_at);
            return d.getTime() == mostRecentDate.getTime();
          })[0];
        } else {
          latest = reactions;
        }
        commented.data[j].notifyParameters = {
          type: "comment",
          typeId: commented.data[j].id,
          commentResponse: "NEW RESPONSE",
          responseDate: latest.created_at,
          responseUser: latest.user_id,
          poolEventName: commented.data[j].poolevent_id,
          commentDate: commented.data[j].created_at
        };
        commented.data[j].created_at = latest.created_at;
        commented.data[j].Microservice = "WAVES.Comment";

        filteredComment.push(commented.data[j]);
        console.log("REACT : ", commented.data[j].id);
      }
    }
    return filteredComment;
  } catch (error) {
    console.log(error);
  }
};

const fetchUserComments = async user => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/comment/user/` + user);
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchVotes = async comment => {
  try {
    const waves_api =
      process.env.ENV === "dev"
        ? process.env.WAVES_API_DEV
        : process.env.WAVES_API_PRODUCTION;
    const { data } = await Axios.get(`${waves_api}/vote/` + comment);
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchResponses = async comment => {
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
    throw error;
  }
};
