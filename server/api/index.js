const express = require('express');
const cors = require('cors');

const server = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('../db/db-config');
const authRouter = require('./auth-router');

const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60, // after 60 mins the cookie expires
    secure: process.env.COOKIE_SECURE || false, // if true, cookie is only sent over https
    httpOnly: true, // JS cannot touch this cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR Compliance, the client should drive this
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60, // deleted expired sessions every hour
  }),
};

server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.use('/api/auth', authRouter);

module.exports = server;
