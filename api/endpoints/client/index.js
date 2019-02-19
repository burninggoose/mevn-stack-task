const router = require("express").Router();
const getRoute = require("./get");
const postRoute = require("./post");
const patchRoute = require("./patch");
const deleteRoute = require("./delete");
const getAllRoute = require("./getAll");

router.get("/client", getAllRoute);

router.get("/client/:id", getRoute);

router.post("/client/", postRoute);

router.patch("/client/:id", patchRoute);

router.delete("/client/:id", deleteRoute);

module.exports = router;
