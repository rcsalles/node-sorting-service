const express = require('express');
const bodyParser = require('body-parser');
const orderBy = require('lodash.orderby'); 
const collectionValidation = require('./middlewares/collection-validation');


const HOST = '0.0.0.0';
const PORT = process.env.PORT || 8080;


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(collectionValidation);


app.post('/', (req, res) => {
  const { collection, keys, orders } = req.body;
  const result = orderBy(collection, keys, orders);

  res.status(200).json(result);
});


app.listen(PORT, HOST);


module.exports = app;