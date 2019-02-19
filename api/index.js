const express = require("express");
const app = express();
const router = require("./endpoints");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const createCounters = require("./utils/createCounters");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(createCounters)
  .catch(err => {
    console.log(err);
    process.exit(0);
  });

app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser());

app.use("/", router);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
