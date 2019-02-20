const Provider = require("../../models/provider");

/**
 * @swagger
 * /provider:
 *   post:
 *     tags:
 *       - provider
 *     description: Create new provider
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Provider object"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Provider"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Created provider"
 *         schema:
 *           type: object
 *           properties:
 *             provider:
 *               $ref: '#/definitions/Provider'
 */

module.exports = function(req, res) {
  const providerBody = req.body;
  delete providerBody._id;
  delete providerBody.id;
  Provider.create(providerBody)
    .then(provider => {
      res.json({ provider });
    })
    .catch(err => {
      if (err.name === "MongoError" && err.code === 11000) {
        res.status(400).send({
          error: true,
          fields: { name: "Provider name already exists" }
        });
      } else {
        console.log(err);
        res.status(500).send({ error: true, message: "Server error" });
      }
    });
};
