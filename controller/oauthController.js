const Axios = require("axios");

exports.authenticate = async (req, res) => {
  try {
    const { code, state } = req.query;
    console.log(code);
    const s = await fetchToken(code);
    console.log(s);

    const p = await fetchProfile(s.access_token);
    console.log(p);

    var userZip = p.profiles[0].supporter.address[0].zip;
    var userCity = p.profiles[0].supporter.address[0].city;
    const result = await getLongLat(userZip + " " + userCity);

    res.cookie("longitude", result.longitude);
    res.cookie("latitude", result.latitude);
    res.cookie("user_zip", p.profiles[0].supporter.address[0].zip);
    res.cookie("user_id", p.id);
    res.cookie("access_token", s.access_token).redirect(state);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error
    });
  }
};

const fetchToken = async code => {
  try {
    const { data } = await Axios.get(
      `https://stage.vivaconagua.org/drops/oauth2/access_token?grant_type=authorization_code&client_id=notify&code=${code}&redirect_uri=http://localhost:8005/v1/events/oauth`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchProfile = async access_token => {
  try {
    const { data } = await Axios.get(
      "https://stage.vivaconagua.org/drops/oauth2/rest/profile?access_token=" +
        access_token
    );

    return data;
  } catch (error) {
    throw error;
  }
};

exports.receiveToken = (req, res) => {
  res.json({});
};
