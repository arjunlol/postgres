const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});
let name = process.argv.slice(2);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  findName(name);
});

let findName = (name) => {
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", name,(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...');
    console.log(`Found ${result.rows.length} person(s) by the name '${name}'`);
    console.log(`-${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${result.rows[0].birthdate}'`); //output: 1
    client.end();
  });
};

  // client.query("SELECT $1::int AS number", ["1"], (err, result) => {
  //   if (err) {
  //     return console.error("error running query", err);
  //   }
  //   console.log(result.rows[0].number); //output: 1
  // });