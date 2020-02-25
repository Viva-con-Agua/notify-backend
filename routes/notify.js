const router = require("express").Router();
const { check } = require("express-validator");
const { verify } = require("../middelware/tokenChecker");

const {
  getNotificationsByVcaId,
  deleteEvents
} = require("../controller/databaseController");

const { authenticate } = require("../controller/oauthController");

router.route("/").delete(deleteEvents);

const { notify } = require("../controller/notificationsController");

router.route("/user/:vcaId").get(getNotificationsByVcaId);

router.route("/oauth").get(authenticate);
router.route("/notify").get(notify);

module.exports = router;
