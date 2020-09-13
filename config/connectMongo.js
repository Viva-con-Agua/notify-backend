const MongoClient = require("mongodb").MongoClient;

// var url = "mongodb://localhost:27017/notifydb";
// var options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   user: "notify",
//   pass: "notify",
// };
// var _db;

const connectMongo = () => {
  // Connection URL
  const url = `mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?&useNewUrlParser=true&useUnifiedTopology=true`;

  // Database Name
  const dbName = process.env.DB_DATABASE;

  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    global.conn = db;
    // client.close();
  });
};

module.exports = { connectMongo };
