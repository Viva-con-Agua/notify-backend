
exports.verify = async (req, res, next) => {

  try {
    const { cookie } = req.headers;
    const list = parseCookies(cookie);
    // console.log(list['access_token']);

    access_token = list['access_token'];
    data = parseJwt(access_token);
    // console.log(data);


    // const [bearer, access_token] = await authorization.split(" ");
    // if (!access_token) {
    //   rs.status(400).json({
    //     success: false,
    //     error: "unauthorized, access token required",
    //   });
    // }
    await global.conn.collection("user").findOneAndUpdate(
      { id: data.user.user_id },
      {
        $setOnInsert: {
          id: data.user.user_id,
          full_name: data.user.profile.full_name,
          address: [
            {
              zip: "10365",
              city: "berlin",
            },
          ],
          invested: [458, 469, 461, 459],
          crew: ["berlin", "hamburg"],
          filter: {
            website: {},
            email: {
              contact_data: data.user.email
            }
          }
        },
      },
      { upsert: true, returnNewDocument: true },
      function (err, res) {
        if (err) throw err;
        console.log("User already in database: " + res.lastErrorObject.updatedExisting);
        // console.log(res.value);
        req.user = res.value;

        next(null, res.value);
      }
    );

  } catch (error) {
    if (error) {
      console.log(error);
      res.status(400).json({ success: false, error: error });
    }
  }
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
const buff = Buffer.from(base64, 'base64');

const str = buff.toString('utf-8');
  var jsonPayload = decodeURIComponent(str.split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function parseCookies (rc) {
  var list = {};
  rc && rc.split(';').forEach(function( cookie ) {
      var parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  return list;
}