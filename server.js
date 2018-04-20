'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/build`));

app.get('*', (request, response) =>
  response.sendFile(`${__dirname}/build/index.html`));

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});