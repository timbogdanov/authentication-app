const server = require('./api');

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});
