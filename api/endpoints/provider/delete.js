const Provider = require("../../models/provider");
const Client = require("../../models/client");
/**
 * @swagger
 * /provider/{id}:
 *   delete:
 *     tags:
 *       - provider
 *     description: Deletes provider by id
 *     parameters:
 *       - in: 'path'
 *         name: id
 *         required: true
 *         type: integer
 *         description: ID of the provider to delete
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
    Provider.findOneAndDelete({ id })
      .then(provider => {
        Client.updateMany(
          { providers: { id } },
          { $pull: { providers: { id } } }
        ).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => console.log(err));
};
