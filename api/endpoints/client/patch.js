const Client = require("../../models/client");
const Provider = require("../../models/provider");

/**
 * @swagger
 * /client/{id}:
 *   patch:
 *     tags:
 *       - client
 *     description: Edit user by id
 *     parameters:
 *       - in: 'path'
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the client to get
 *       - in: "body"
 *         name: "body"
 *         description: "Client object with edited fields"
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
 *       400:
 *         description: "Invalid ID"
 */

module.exports = function(req, res) {
  const id = req.params.id;
  const updateBody = req.body;
  delete updateBody._id;
  delete updateBody.id;
  if (!id) res.status(400).json({ message: "No ID specified" });
  else
    Client.findOneAndUpdate({ id: id }, updateBody, { new: true })
      .then(client => {
        if (!client) res.status(400).json({ message: "Invalid ID" });
        else
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
      .catch(err => console.log(err));
};
