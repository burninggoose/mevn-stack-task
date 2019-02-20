const Client = require("../../models/client");
const Provider = require("../../models/provider");
const getErrorField = require("../../utils/getErrorField");

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
              return res.status(400).send({
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
