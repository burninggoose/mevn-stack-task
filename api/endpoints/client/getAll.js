const Client = require("../../models/client");
const Provider = require("../../models/provider");

/**
 * @swagger
 * /client:
 *   get:
 *     tags:
 *       - client
 *     description: Get all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "All clients"
 *         schema:
 *           type: object
 *           properties:
 *             client:
 *               $ref: '#/definitions/Client'
 *             providers:
 *               $ref: '#/definitions/Provider'
 */

module.exports = function(req, res) {
  Client.find({}, "-_id")
    .then(clients => {
      const providerIds = new Set();
      for (let i in clients) {
        for (let k in clients[i].providers) {
          providerIds.add(clients[i].providers[k].id);
        }
      }
      Provider.find({ id: { $in: [...providerIds] } }, "-_id").then(
        providers => {
          res.json({ clients, providers });
        }
      );
    })
    .catch(err => console.log(err));
};
