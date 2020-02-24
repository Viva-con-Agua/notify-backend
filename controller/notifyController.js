const var_dump = require("var_dump");

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

exports.getLastSeen = (type, userId, pooleventId) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT date, status
                FROM notifications
                WHERE type_id='${pooleventId}' AND user_id = '${userId}' AND type = '${type}';`;
    global.conn.query(sql, (err, date) => {
      if (err) {
        reject(err);
      } else {
        // var_dump(date);
        resolve(date);
      }
    });
  });

exports.getLastSeen = (type, userId, pooleventId) =>
  new Promise((resolve, reject) => {
    const sql = `SELECT date, status
                FROM notifications
                WHERE type_id='${pooleventId}' AND user_id = '${userId}' AND type = '${type}';`;
    global.conn.query(sql, (err, date) => {
      if (err) {
        reject(err);
      } else {
        // var_dump(date);
        resolve(date);
      }
    });
  });

exports.updateLastSeen = (type, userId, pooleventId, callback) => {
  try {
    const sql = `INSERT INTO notifications SET type_id='${pooleventId}', user_id = '${userId}',type = '${type}', date=CURRENT_TIMESTAMP()`;
    // console.log(sql);
    global.conn.query(sql, (error, comment) => {
      // console.log(comment);
      if (error) {
        callback(error);
      } else {
        callback(null, comment);
      }
    });
  } catch (error) {
    callback(error);
  }
};

exports.deleteEvent = (req, res) => {
  console.log("del");
  const { id } = req.params;
  const sql = `UPDATE notifications SET date=CURRENT_TIMESTAMP(), status='seen' WHERE type_id='${id}' AND user_id = '8d411dc4-e76f-4d0e-a027-056a0bc43be5' AND type = 'event'`;
  console.log(sql);
  global.conn.query(sql, (error, comment) => {
    console.log(comment);
    if (error) {
      res.status(400).json({
        success: false,
        message: `Error in deletefavorite ${error.message}`
      });
    } else {
      if (comment.affectedRows === 0) {
        const sql = `INSERT INTO notifications SET date=CURRENT_TIMESTAMP(), status='seen', type_id='${id}', user_id = '8d411dc4-e76f-4d0e-a027-056a0bc43be5',type = 'event'`;
        console.log(sql);
        global.conn.query(sql, (error, comment) => {
          console.log(comment);

          if (error) {
            res.status(400).json({
              success: false,
              message: `Error in deletefavorite ${error.message}`
            });
          } else {
            res.status(200).json({
              success: true,
              data: comment
            });
          }
        });
      } else {
        res.status(200).json({
          success: true,
          data: comment
        });
      }
    }
  });
};
