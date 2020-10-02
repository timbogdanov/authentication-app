const router = require('express').Router();

const Users = require('./user-model');

router.get('/:id', (req, res) => {
  const id = req.params.id;

  Users.getUser(id).then((users) => {
    res.status(200).json(users);
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Users.updateUser(id, data).then((users) => {
    res.status(200).json(users);
  });
});

module.exports = router;
