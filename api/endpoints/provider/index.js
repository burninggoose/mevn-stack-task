const express = require("express");
const router = express.Router();
const getRoute = require("./get");
const postRoute = require("./post");
const patchRoute = require("./patch");
const deleteRoute = require("./delete");
const getAllRoute = require("./getAll");

router.get("/provider", getAllRoute);

router.get("/provider/:id", getRoute);

router.post("/provider", postRoute);

router.patch("/provider/:id", patchRoute);

router.delete("/provider/:id", deleteRoute);

module.exports = router;
