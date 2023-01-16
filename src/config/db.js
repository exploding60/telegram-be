const { Pool } = require("pg");
const fs = require("fs");

const connect =
  "postgresql://doadmin:AVNS__jiEz59TUHpRaJ-lQe1@pijardb-do-user-13063919-0.b.db.ondigitalocean.com:25060/telegram?sslmode=require";

const pool = new Pool({
  user: "doadmin",
  host: "pijardb-do-user-13063919-0.b.db.ondigitalocean.com",
  database: "telechat",
  password: "AVNS__jiEz59TUHpRaJ-lQe1",
  port: "25060",
  ssl: true,
  ssl: { ca: fs.readFileSync(__dirname + "/ca.crt"), rejectUnauthorized: true },
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success connect to db");
  }
});

module.exports = pool;
// const fs = require("fs");
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT,
//   ssl: true,
//   ssl: {
//     ca: fs.readFileSync(__dirname + "/ca.crt"),
//     rejectUnauthorized: true,
//   },
// });

// module.exports = pool;
