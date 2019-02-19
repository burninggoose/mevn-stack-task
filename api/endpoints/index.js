const ClientRoutes = require("./client");
const ProviderRoutes = require("./provider");
const router = require("express").Router();

router.use(ClientRoutes);
router.use(ProviderRoutes);

module.exports = router;
