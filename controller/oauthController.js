const Axios = require("axios");
var NodeGeocoder = require("node-geocoder");

exports.authenticate = async (req, res) => {
  try {
    const { code, state } = req.query;
    console.log(code);
    const s = await fetchToken(code);
    console.log("access_token fetched: " + s.access_token);

    const p = await fetchProfile(s.access_token);
    console.log("profile fetched from: " + p.profiles[0].supporter.fullName);

    var userZip = p.profiles[0].supporter.address[0].zip;
    var userCity = p.profiles[0].supporter.address[0].city;
    const result = await getLongLat(userZip + " " + userCity);

    res.cookie("longitude", result.longitude);
    res.cookie("latitude", result.latitude);
    res.cookie("user_zip", p.profiles[0].supporter.address[0].zip);
    res.cookie("user_id", p.id);
    res.cookie("user_name", p.profiles[0].supporter.fullName);
    var date = new Date();
    date.setTime(date.getTime() + 10 * 60 * 1000);
    res
      .cookie("access_token", s.access_token, { expires: date })
      .redirect(state);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error,
    });
  }
};

const fetchToken = async (code) => {
  try {
    isDev = process.env.ENV === "dev";
    authUrlDev = process.env.OAUTH_DEV;
    authUrlProduction = process.env.OAUTH_PRODUCTION;
    clientIdDev = process.env.CLIENT_ID_DEV;
    clientIdProduction = process.env.CLIENT_ID_PRODUCTION;
    redirectDev = process.env.REDIRECT_DEV;
    redirectProduction = process.env.REDIRECT_PRODUCTION;
    frontendDev = process.env.FRONTEND_DEV;
    frontendProduction = process.env.FRONTEND_PRODUCTION;
    const { data } = await Axios.get(
      // `https://stage.vivaconagua.org/drops/oauth2/access_token?grant_type=authorization_code&client_id=notify&code=${code}&redirect_uri=http://localhost:8005/v1/events/oauth`
      `${
        isDev ? authUrlDev : authUrlProduction
      }/drops/oauth2/access_token?grant_type=authorization_code&client_id=${
        isDev ? clientIdDev : clientIdProduction
      }&code=${code}&redirect_uri=${isDev ? redirectDev : redirectProduction}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProfile = async (access_token) => {
  try {
    const oauth =
      process.env.ENV === "dev"
        ? process.env.OAUTH_DEV
        : process.env.OAUTH_PRODUCTION;
    const { data } = await Axios.get(
      `${oauth}/drops/oauth2/rest/profile?access_token=` + access_token
    );

    return data;
  } catch (error) {
    throw error;
  }
};

exports.receiveToken = (req, res) => {
  res.json({});
};

function getLongLat(userZipCity) {
  return new Promise((resolve) => {
    console.log(userZipCity);

    // var options = {
    //   provider: "google",
    //   httpAdapter: "https", // Default
    //   apiKey: process.env.GOOGLE_AUTH,
    //   formatter: null // 'gpx', 'string', ...
    // };

    var options = {
      provider: "opencage",
      httpAdapter: "https",
      apiKey: "68abc0e17ce54ede8b5ea7d267c34112",
      formatter: null,
    };

    var geocoder = NodeGeocoder(options);
    geocoder
      .geocode(userZipCity)
      .then(function (res) {
        // console.log(res);

        var longLat = {
          longitude: res[0].longitude,
          latitude: res[0].latitude,
        };
        console.log(longLat);
        resolve(longLat);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}
