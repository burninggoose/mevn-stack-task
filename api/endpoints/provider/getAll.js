const Provider = require("../../models/provider");

/**
 * @swagger
 * /provider:
 *   get:
 *     tags:
 *       - provider
 *     description: Get all providers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "All providers"
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Provider'
 */

module.exports = function(req, res) {
  Provider.find()
    .then(providers => {
      res.json({ providers });
    })
    .catch(err => console.log(err));
};
