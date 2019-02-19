const Client = require("../../models/client");
const Provider = require("../../models/provider");
/**
 * @swagger
 * /client/{id}:
 *   get:
 *     tags:
 *       - client
 *     description: Get user by id
 *     parameters:
 *       - in: 'path'
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the client to get
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Client object"
 *         schema:
 *           type: object
 *           properties:
 *             client:
 *               $ref: '#/definitions/Client'
 *             providers:
 *               $ref: '#/definitions/Provider'
 *       400:
 *         description: "Invalid ID"
 */

module.exports = function(req, res, next) {
  const id = req.params.id;
  if (!id) res.status(400).json({ message: "No ID specified" });
  else
    Client.findOne({ id }, "-_id")
      .then(client => {
        if (!client) res.status(400).json({ message: "Invalid ID" });
        else {
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
        }
      })
      .catch(err => console.log(err));
};
