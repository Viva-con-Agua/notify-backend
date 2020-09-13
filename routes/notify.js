const router = require("express").Router();
const { check } = require("express-validator");
const { verify } = require("../middelware/tokenChecker");
const {
  getNotificationsByVcaId,
  deleteEvents,
} = require("../controller/databaseController");
const { authenticate } = require("../controller/oauthController");
const { notify } = require("../controller/notificationsController");
const { update } = require("../controller/updateController");
const { test, info } = require("../controller/setupController");
const { filter } = require("../controller/filterController");

router.route("/user/:vcaId").get(getNotificationsByVcaId);
router.route("/oauth").get(authenticate);
router.route("/notify").get(notify);
router.route("/update").get(update);
router.route("/filter").get(filter);
router.route("/test").post(test);
router.route("/info").post(info);

router.route("/").delete(deleteEvents);

module.exports = router;
