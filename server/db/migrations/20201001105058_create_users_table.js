exports.up = function (knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments();

    t.string('photo').nullable();
    t.string('name', 255).notNullable();
    t.string('bio', 255).nullable();
    t.string('phone', 255).unique().notNullable();
    t.string('email', 255).unique().notNullable();
    t.string('password', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
