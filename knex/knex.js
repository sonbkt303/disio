
const config = require('../knexfile.js');
require("dotenv").config();
const environment = process.env.NODE_ENV || 'development';

const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);


// const knex = require("knex")({
//   client: "mysql2",
//   connection: {
//     host: "localhost",
//     port: 3306,
//     user: "mike_dev01",
//     password: "1",
//     database: "evn_dev",
//   },
//   debug: true,
//   pool: { min: 0, max: 7 },
// });

knex.raw("SELECT 1").then(() => {
    console.log("PostgreSQL connected");
})
.catch((e) => {
    console.log("PostgreSQL not connected");
    console.error(e);
});


const main = async () => {
  const data = await knex("movies").select("*").where("id", 1)

  console.log(data);
};

main();

module.exports = knex;

// main()
