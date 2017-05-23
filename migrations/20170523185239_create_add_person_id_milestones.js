
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('public.milestones_new', function(table){
      table.increments('id').primary();
      table.string('description');
      table.date('date_achieved');
      table.integer('person_id').unsigned();
      table.foreign('person_id').references('famous_people.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('public.milestones_new')
  ])
};
