const Client = require("../../models/client");

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     tags:
 *       - client
 *     description: Deletes user by id
 *     parameters:
 *       - in: 'path'
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the client to delete
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: "Successeful delete"
 *       400:
 *         description: "Invalid ID"
 */

module.exports = function(req, res) {
  const id = req.params.id;
  if (!id) res.status(400).json({ message: "No ID specified" });
  else
    Client.findOneAndDelete({ id })
      .then(client => {
        res.json({ success: true });
      })
      .catch(err => console.log(err));
};
