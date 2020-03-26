const mysql = require("mysql2");

const connectMysql = () => {
  try {
    const conn = mysql.createConnection(
      {
        host: process.env.HOST,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
      },
      { multipleStatements: true }
    );
    conn.connect(err => {
      if (err) throw err;
      console.log("db connected");
      global.conn = conn;
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { connectMysql };
