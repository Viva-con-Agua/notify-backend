// @desc get poolevent by id
// @route GET /api/v1/:id
// @access Public
exports.getNotificationsByVcaId = (req, res) => {

  var vcaId = req.params.vcaId;

  if(true){
    res.status(200).json({
      success: true,
      data: vcaId
    });
  }

};













