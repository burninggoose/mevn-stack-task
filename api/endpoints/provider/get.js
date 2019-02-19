const Provider = require("../../models/provider");

/**
 * @swagger
 * /provider/{id}:
 *   get:
 *     tags:
 *       - provider
 *     description: Get provider by id
 *     parameters:
 *       - in: 'path'
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the provider to get
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Provider object"
 *         schema:
 *           type: object
 *           properties:
 *             provider:
 *               $ref: '#/definitions/Provider'
 *       400:
 *         description: "Invalid ID"
 */

module.exports = function(req, res, next) {
  const id = req.params.id;
  if (!id) res.status(400).json({ message: "Invalid ID" });
  else {
    Provider.findOne({ id })
      .then(provider => {
        if (!provider) res.status(400).json({ message: "Invalid ID" });
        else res.json({ provider });
      })
      .catch(err => console.log(err));
  }
};
