const Counter = require("../models/counter");

function createCounters() {
  return Counter.findById("provider")
    .then(counter => {
      if (!counter) return Counter.create({ _id: "provider", seq: 0 });
    })
    .then(_ => {
      return Counter.findById("client");
    })
    .then(counter => {
      if (!counter) return Counter.create({ _id: "client", seq: 0 });
    });
}

module.exports = createCounters;
