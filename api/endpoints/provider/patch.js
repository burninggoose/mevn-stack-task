const Provider = require("../../models/provider");

/**
 * @swagger
 * /provider/{id}:
 *   patch:
 *     tags:
 *       - provider
 *     description: Edit user by id
 *     parameters:
 *       - in: 'path'
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the client to get
 *       - in: "body"
 *         name: "body"
 *         description: "Provider object with edited fields"
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Provider"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Edited provider"
 *         schema:
 *           type: object
 *           properties:
 *             provider:
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
    Provider.findOneAndUpdate({ id: id }, updateBody, { new: true })
      .then(provider => {
        if (!provider) res.status(400).json({ message: "Invalid ID" });
        res.json({ provider });
      })
      .catch(err => console.log(err));
};
