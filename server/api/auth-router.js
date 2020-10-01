const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('./auth-model');

router.post('/register', (req, res) => {
  const { photo, name, bio, phone, email, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);

  Users.add({ photo, name, bio, phone, email, password: hash })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(200).json({ message: error.message });
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  Users.findBy({ email }).then(([user]) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggedIn = true;

      res.status(200).json({
        messgae: `logged in successfully ${user.email}`,
        session: req.session,
      });
    } else {
      res.status(401).json({ error: 'you shall not pass!' });
    }
  });
});

router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).json({ message: 'already logged out' });
  }
});

module.exports = router;
