const db = require('../../db/db-config');

module.exports = {
  getUser,
  updateUser,
};

function getUser(id) {
  return db('users')
    .select('id', 'photo', 'name', 'bio', 'phone', 'email')
    .where({ id })
    .first();
}

function updateUser(id, data) {
  return db('users')
    .select('id', 'photo', 'name', 'bio', 'phone', 'email')
    .where({ id })
    .update(data, ['id', 'photo', 'name', 'bio', 'phone', 'email']);
}
