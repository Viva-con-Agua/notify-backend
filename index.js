// const { connectMysql } = require("./config/connectMysql");
const { connectMongo } = require("./config/connectMongo");

// mongoUtil.connectToServer(function (err, client) {
//   if (err) console.log(err);
//   // start the rest of your app here
// });

const initSubscriber = require("./service/natsSubscribtion.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan")("dev");
const express = require("express");
const routes = require("./routes/routes");
const socket = require("./socket");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");

dotenv.config({ path: "./config/.env" });

const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

socket(io);
// eventEmitter();

if (process.env.NODE_ENV == "dev") {
  app.use(morgan);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
connectMongo();
// app.use(cors());


app.use(cors({origin: 'http://localhost:8080', credentials: true}));


app.use("/api/v1", routes);

const port = process.env.PORT || 8005;

server.listen(port, () => {
  console.log(
    `App running in ${process.env.ENV} mode on port ${port}`.green.bold
  );
});

initSubscriber();
