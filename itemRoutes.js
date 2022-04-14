"use strict";

const express = require("express");
const { NotFoundError } = require("./expressError");

const db = require("./fakeDb");
const router = new express.Router();

/** GET /items: get list of items */
router.get("/", function (req, res) {
	return res.json({ items: db.items });
});

/** POST /items: add and item to the list */
router.post("/", function (req, res) {
	const name = req.body.name;
	const price = req.body.price;

	// db.items.push(req.body) // test this later
	db.items.push({ name, price });

	return res.status(201).json({ added: { name, price } });
});

/** GET /items/[name]: get single requested item */
router.get("/:name", function (req, res) {
	const name = req.params.name;

	// for (let item of db.items) {
	// 	if (item.name === name) {
	// 		return res.json(item);
	// 	}
	// }

	const item = db.items.filter((i) => i.name === name);
	if (item[0]) {
		return res.json(item[0]);
	} else {
		throw new NotFoundError("item not found");
	}

	// 	throw new NotFoundError("item not found");
});

/** PATCH /items/[name]: update item */
router.patch("/:name", function (req, res) {
	const name = req.params.name;
	const newName = req.body.name;
	const newPrice = req.body.price;

	for (let item of db.items) {
		if (item.name === name) {
			item.name = newName;
			item.price = newPrice;
			return res.json({ updated: item });
		}
	}

	throw new NotFoundError("item not found");
});

/** DELETE /items/[name]: delete item, return {message: Deleted} */
router.delete("/:name", function (req, res) {
	const name = req.params.name;
	for (let item of db.items) {
		if (item.name === name) {
			db.items = db.items.filter((i) => i.name !== name);

			return res.json({ message: "Deleted" });
		}
	}
	throw new NotFoundError("item not found");
});

module.exports = router;
