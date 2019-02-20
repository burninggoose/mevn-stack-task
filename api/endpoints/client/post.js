const Client = require("../../models/client");
const Provider = require("../../models/provider");
const getErrorField = require("../../utils/getErrorField");

/**
 * @swagger
 * /client:
 *   post:
 *     tags:
 *       - client
 *     description: Create new client
 *     parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "Client object"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Client"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Edited client"
 *         schema:
 *           type: object
 *           properties:
 *             client:
 *               $ref: '#/definitions/Client'
 *             providers:
 *               $ref: '#/definitions/Provider'
 */

module.exports = function(req, res) {
  const clientBody = req.body;
  delete clientBody._id;
  delete clientBody.id;
  Client.create(clientBody)
    .then(client => {
      Provider.find(
        {
          id: {
            $in: client.providers.map(provider => {
              return provider.id;
            })
          }
        },
        "-_id"
      ).then(providers => {
        res.json({ client, providers });
      });
    })
    .catch(err => {
      if (err.name === "MongoError" && err.code === 11000) {
        const field = getErrorField(err.message);
        switch (field) {
          case "email":
            return res.status(400).send({
              error: true,
              fields: { email: "Cleint email already exists" }
            });
          case "name":
            return res
              .status(400)
              .send({
                error: true,
                fields: { name: "Client name already exists" }
              });
          default:
            break;
        }
      } else {
        console.log(err);
        res.status(500).send({ error: true, message: "Server error" });
      }
    });
};
