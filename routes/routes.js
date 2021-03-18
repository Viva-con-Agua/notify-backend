const router = require("express").Router();
const { authenticate } = require("../controller/oauthController");
const {
  notifications,
  updateNotificationStatus,
} = require("../controller/websiteNotificationsController");
const {
  testAPI,
  info,
  saveConditions,
  saveCategories,
} = require("../controller/settingsController");
const { filter, apis } = require("../controller/filterController");
const { user, updateuser } = require("../controller/userController");
const { verify } = require("../middelware/tokenChecker");
// const { readme } = require("../README.html");

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "i'm alive!",
  });
});
// router.route("/").get(readme);

router.route("/oauth").get(authenticate);

router.route("/notifications").get(verify, notifications);
router.route("/updateStatus").post(verify, updateNotificationStatus);

router.route("/filter").get(filter);
router.route("/apis").get(apis);

router.route("/testAPI").post(verify, testAPI);
router.route("/info").post(verify, info);
router.route("/saveCategories").post(verify, saveCategories);
router.route("/saveConditions").post(verify, saveConditions);

router.route("/user").get(verify, user);
router.route("/updateUser").post(verify, updateuser);

module.exports = router;
