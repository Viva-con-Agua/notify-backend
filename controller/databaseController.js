// @desc get poolevent by id
// @route GET /api/v1/:id
// @access Public
exports.getNotificationsByVcaId = (req, res) => {
  var vcaId = req.params.vcaId;

  if (true) {
    res.status(200).json({
      success: true,
      data: vcaId,
    });
  }
};

exports.getStatus = (type, userId, pooleventId) =>
  new Promise((resolve, reject) => {
    console.log("sql");

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

exports.updateLastSeen = (type, userId, pooleventId, status, callback) => {
  try {
    const sql = `INSERT INTO notifications SET type_id='${pooleventId}', user_id = '${userId}',type = '${type}', date=CURRENT_TIMESTAMP(), status='${status}'`;
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
        message: `Error in deletefavorite ${error.message}`,
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
              message: `Error in deletefavorite ${error.message}`,
            });
          } else {
            res.status(200).json({
              success: true,
              data: comment,
            });
          }
        });
      } else {
        res.status(200).json({
          success: true,
          data: comment,
        });
      }
    }
  });
};

exports.deleteEvents = async (req, res) => {
  console.log("deleteEvents");

  var userId = "a1f198b5-09f0-4271-b3b3-89e4a0e655e7";

  var promises = [];

  //console.log(req.body);

  for (var x = 0; x < req.body.length; x++) {
    var notifyType = req.body[x].type;
    var typeId = req.body[x].typeId;
    var status = req.body[x].status;

    /*const promise = addNotify(userId,notifyType,typeId,status);
    promises.push(promise);
    */

    console.log("DELETE ", userId, notifyType, typeId, status);
    const resp = await addNotify(userId, notifyType, typeId, status);
    console.log("SUCCESS DELETE: " + resp.success);

    //console.log(promise);
  }

  res.status(200).json({
    success: true,
    data: "finished",
  });

  /*
  Promise.all(promises).then(values => {
    console.log("beide fertig");
    res.status(200).json({
      success: true,
      data: "finished"
    });
  });
  */
  console.log();
};

function addNotify(userId, notifyType, typeId, status) {
  return new Promise((resolve) => {
    const sql = `UPDATE notifications SET date=CURRENT_TIMESTAMP(), status='${status}' WHERE type_id='${typeId}' AND user_id='${userId}' AND type='${notifyType}'`;
    console.log(sql);
    global.conn.query(sql, (error, answ) => {
      //console.log(answ);
      if (error) {
        resolve({ success: false, data: error });
      } else {
        if (answ.affectedRows === 0) {
          const sql = `INSERT INTO notifications SET date=CURRENT_TIMESTAMP(), status='${status}', type_id='${typeId}', user_id='${userId}', type='${notifyType}'`;

          global.conn.query(sql, (error, answer) => {
            if (error) {
              resolve({ success: false, data: error });
            } else {
              resolve({ success: true, data: answer });
            }
          });
        } else {
          resolve({ success: true, data: answ });
        }
      }
    });
  });
}

exports.deleteEventsOld = (req, res) => {
  console.log("del");

  const { id } = req.params;
  const sql = `UPDATE notifications SET date=CURRENT_TIMESTAMP(), status='seen' WHERE type_id='${id}' AND user_id = 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7' AND type = 'event'`;
  console.log(sql);
  global.conn.query(sql, (error, comment) => {
    console.log(comment);
    if (error) {
      res.status(400).json({
        success: false,
        message: `Error in deletefavorite ${error.message}`,
      });
    } else {
      if (comment.affectedRows === 0) {
        const sql = `INSERT INTO notifications SET date=CURRENT_TIMESTAMP(), status='seen', type_id='${id}', user_id = 'a1f198b5-09f0-4271-b3b3-89e4a0e655e7',type = 'event'`;
        console.log(sql);
        global.conn.query(sql, (error, comment) => {
          console.log(comment);

          if (error) {
            res.status(400).json({
              success: false,
              message: `Error in deletefavorite ${error.message}`,
            });
          } else {
            res.status(200).json({
              success: true,
              data: comment,
            });
          }
        });
      } else {
        res.status(200).json({
          success: true,
          data: comment,
        });
      }
    }
  });
};
