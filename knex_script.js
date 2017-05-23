const settings = require("./settings"); // settings.json
const name = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const findName = (name, cb) => {
  knex.select('*')
    .from('famous_people')
    .where('first_name', '=', name)
    .orWhere('last_name', '=', name)
    .asCallback((err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      cb(result);
    });
};

const findNameOutput = (result) => {
  console.log('Searching...');
  console.log(`Found ${result.length} person(s) by the name '${name}'`);
  result.forEach((row) => {
      console.log(`-${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
  });
};

findName(name, (result) => {
  findNameOutput(result);
});
