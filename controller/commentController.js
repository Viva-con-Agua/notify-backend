const Axios = require("axios");

exports.getCommentReactions = async userId =>
  new Promise(async (resolve, reject) => {
    try {
      console.log("Get new comment-reactions!");

      var filteredComment = [];
      var commented = await fetchUserComments(userId);
      // console.log(commented);
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
          console.log("AddedComment", commented.data[j].id, "RESPONSE");
        }
      }
      console.log("filteredComment");

      resolve(filteredComment);
    } catch (error) {
      reject(error);
    }
  });

const fetchUserComments = async user => {
  try {
    const { data } = await Axios.get(
      "http://localhost:5000/waves/api/v1/comment/user/" + user
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchVotes = async comment => {
  try {
    const { data } = await Axios.get(
      "http://localhost:5000/waves/api/v1/vote/" + comment
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchResponses = async comment => {
  try {
    const { data } = await Axios.get(
      "http://localhost:5000/waves/api/v1/comment/response/" + comment
    );
    return data;
  } catch (error) {
    throw error;
  }
};
