const e = require("cors");

exports.verify = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    const [bearer, access_token] = await authorization.split(" ");
    if (!access_token) {
      rs.status(400).json({
        success: false,
        error: "unauthorized, access token required",
      });
    }
    await global.conn
      .collection("user")
      .find({ access_token: access_token })
      .toArray()
      .then((user) => {
        if (user.length > 0) {
          req.user = user[0];
          next(null, user);
        } else {
          res.status(400).json({ success: false, error: `unauthorized` });
        }
      })
      .catch((error) => {
        return error;
      });
  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error });
    }
  }
};
