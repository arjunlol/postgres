const settings = require("./settings"); // settings.json
const firstLastDate = process.argv.slice(2);

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
const insertPerson = (firstLastDate) => {
  knex('famous_people')
    .insert({first_name:firstLastDate[0], last_name:firstLastDate[1], birthdate:firstLastDate[2]})
    .asCallback((err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      knex.destroy();
    }

    )
};

insertPerson(firstLastDate);
