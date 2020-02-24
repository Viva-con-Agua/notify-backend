const router = require("express").Router();
const { check } = require("express-validator");
const { verify } = require("../middelware/tokenChecker");

const {
  getNotificationsByVcaId,
  deleteEvent
} = require("../controller/notifyController");

const { authenticate, notify } = require("../controller/oauthController");

router.route("/delete/event/:id").post(deleteEvent);

router.route("/user/:vcaId").get(getNotificationsByVcaId);

router.route("/oauth").get(authenticate);
router.route("/notify").get(notify);

module.exports = router;
