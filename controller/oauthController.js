const Axios = require("axios");

exports.authenticate = async (req, res) => {
  try {
    // const { code, state } = req.query;
    console.log("oauth");

    var p = await Axios.post("http://localhost:1323/v1/auth/signin", {
      email: "dennis_kleber@mailbox.org",
      password: "testtest",
      service: "drops-backend",
    });

    console.log(p.data);

    // const s = await fetchToken(code);
    // console.log("access_token fetched: " + s.access_token);

    // const p = await fetchProfile(s.access_token);
    // console.log("profile fetched from: " + p.profiles[0].supporter.fullName);
    // var obj = { name: 'event', notifytype: 'action' };

    // await global.conn.collection("microservices").updateOne(
    //   { name: 'waves' },
    //   {
    //     $set: {
    //       name: 'waves',
    //       api: 'http://localhost:5000/waves/api/v1/notifications',
    //       types: obj,
    //     },
    //   },
    //   { upsert: true },
    //   function (err, res) {
    //     if (err) throw err;
    //     console.log("Number of documents inserted: " + res.insertedCount);
    //     console.log("Number of documents updated: " + res.result.nModified);
    //     console.log("Number of documents matched: " + res.result.nMatched);
    //     console.log("Number of documents upserted: " + res.result.nUpserted);
    //   }
    // );
    p = p.data.additional.profile;

    // global.conn
    //   .collection("user")
    //   .insertOne({
    //     id: p.uuid,
    //     full_name: p.full_name,
    //     address: [{
    //               zip: '10365',
    //               city: 'berlin'
    //             }],
    //     invested: [458, 469, 461, 459],
    //     crew: ["berlin", "hamburg"],
    //     filter: { Crew: true, Location: true }
    //   }, function (err, res) {
    //     if (err) throw err;

    //     console.log("Number of documents Inserted: " + res.nInserted);

    //   });
    var s = {
      access_token: "1234",
    };

    await global.conn.collection("user").updateOne(
      { id: p.uuid },
      {
        $setOnInsert: {
          id: p.uuid,
          full_name: p.full_name,
          address: [
            {
              zip: "10365",
              city: "berlin",
            },
          ],
          invested: [458, 469, 461, 459],
          crew: ["berlin", "hamburg"],
          filter: [],
          email: [],
          access_token: s.access_token,
        },
      },
      { upsert: true },
      function (err, res) {
        if (err) throw err;
        console.log("New user: " + res.upsertedCount);
        console.log("User already in database: " + res.matchedCount);
      }
    );

    var state = "http://localhost:8080/";

    res.cookie("user_id", p.uuid);
    res.cookie("user_name", p.full_name);
    var date = new Date();
    date.setTime(date.getTime() + 10 * 60 * 1000);
    res
      .cookie("access_token", s.access_token, { expires: date })
      .redirect(state);
  } catch (error) {
    console.log(error);
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
