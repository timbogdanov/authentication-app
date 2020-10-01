const db = require('../db/db-config');

module.exports = {
  add,
  findBy,
};

function add(data) {
  return db('users').insert(data);
}

function findBy(filter) {
  return db('users').where(filter).orderBy('id');
}
