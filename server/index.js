const app = require('./app');

const port = process.env.port || 8081;

app.listen(port, (error) => {
  if (error) {
    console.log(error, 'ERROR: not connected to server!');
  }
  console.log(`Listening on port ${port}!`);
});
