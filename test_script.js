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
  findName(name, (result) => {
    findNameOutput(result);
  });
});

let findName = (name, cb) => {
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", name,(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    cb(result);
    client.end();
  });
};

let findNameOutput = (result) => {
  console.log('Searching...');
  console.log(`Found ${result.rows.length} person(s) by the name '${name}'`);
  result.rows.forEach((row) => {
      console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
  });
};
