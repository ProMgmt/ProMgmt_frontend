'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/build`));

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});