// @desc get poolevent by id
// @route GET /api/v1/:id
// @access Public
exports.getNotificationsByVcaId = (req, res) => {
  var vcaId = req.params.vcaId;

  if (true) {
    res.status(200).json({
      success: true,
      data: vcaId
    });
  }
};
// exports.getStatus = async (type, userId, pooleventId) => {
//   // let { pooleventId, userId, type } = req.query;
//   // console.log(pooleventId);
//   // console.log(userId);
//   // console.log(type);

//   const sql = `SELECT status
//               FROM notifications
//               WHERE type_id='${pooleventId}' AND user_id = '${userId}' AND type = '${type}';`;
//   console.log(sql);
//   global.conn.query(sql, (err, data) => {
//     if (err) {
//       throw error;
//     } else {
//       console.log(data);

//       return data;
//     }
//   });
// };

exports.getStatus = (type, userId, pooleventId) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT status
                FROM notifications
                WHERE type_id='${pooleventId}' AND user_id = '${userId}' AND type = '${type}';`;
    global.conn.query(sql, (err, status) => {
      if (err) {
        reject(err);
      } else {
        resolve(status);
      }
    });
  });
