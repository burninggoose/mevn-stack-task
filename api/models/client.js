const mongoose = require("mongoose");
const Counter = require("./counter");

const SmallProvider = new mongoose.Schema(
  {
    id: Number
  },
  { _id: false }
);

/**
 * @swagger
 *
 * definitions:
 *   Client:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       phone:
 *         type: string
 *       providers:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Provider'
 * tags:
 *  name: "client"
 *  description: "Client endpoints"
 */

const ClientSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    phone: {
      type: String
    },
    providers: [SmallProvider]
  },
  { versionKey: false }
);

ClientSchema.pre("save", async function(next) {
  if (this.isNew) {
    doc = this;
    counter = await Counter.findByIdAndUpdate("client", {
      $inc: { seq: 1 }
    });
    doc.id = counter.seq;
  }
  return;
});

module.exports = mongoose.model("Client", ClientSchema);
