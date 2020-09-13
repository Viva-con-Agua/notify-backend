const mysql = require("mysql2");

const connectMysql = () => {
  try {
    const conn = mysql.createConnection(
      {
        host: process.env.HOST,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: 3307,
      },
      { multipleStatements: true }
    );
    conn.connect((err) => {
      if (err) throw err;
      console.log("db connected");
      global.conn = conn;
    });
  } catch (error) {
    console.log(process.env.HOST);
    console.log(process.env.USER_NAME);
    console.log(process.env.PASSWORD);
    console.log(process.env.DATABASE);

    throw error;
  }
};

module.exports = { connectMysql };
