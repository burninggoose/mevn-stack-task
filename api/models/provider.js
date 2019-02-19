const mongoose = require("mongoose");
const Counter = require("./counter");

/**
 * @swagger
 *
 * definitions:
 *   Provider:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 * tags:
 *  name: "provider"
 *  description: "Provider endpoints"
 */

const ProviderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    name: {
      type: String
    }
  },
  { versionKey: false }
);

ProviderSchema.pre("save", async function(next) {
  if (this.isNew) {
    doc = this;
    counter = await Counter.findByIdAndUpdate("provider", {
      $inc: { seq: 1 }
    });
    doc.id = counter.seq;
  }
  return;
});

module.exports = mongoose.model("Provider", ProviderSchema);
