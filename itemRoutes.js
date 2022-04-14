"use strict";

const express = require("express");

const { Item } = require("./models");

const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
	return res.json({ items: Item.getAll() });
});

/** POST /items: add and item to the list */
router.post("/", function (req, res) {
	const item = new Item(req.body.name, req.body.price);

	return res.status(201).json({ added: item });
});

/** GET /items/[name]: get single requested item */
router.get("/:name", function (req, res) {
	const name = req.params.name;

	const item = Item.getOne(name);

	return res.json(item);
});

/** PATCH /items/[name]: update item */
router.patch("/:name", function (req, res) {
	const item = Item.update(req.params.name, req.body);

	return res.json({ updated: item });
});

/** DELETE /items/[name]: delete item, return {message: Deleted} */
router.delete("/:name", function (req, res) {
	const name = req.params.name;

	Item.delete(name);
	return res.json({ message: "Deleted" });
});

module.exports = router;
