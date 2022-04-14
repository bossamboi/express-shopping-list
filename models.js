"use strict";

const { NotFoundError } = require("./expressError");
const db = require("./fakeDb");

class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;
		db.items.push(this);
	}

	static getAll() {
		return db.items;
	}

	static getOne(name) {
		const item = db.items.filter((i) => i.name === name);
		if (item[0]) {
			return item[0];
		} else {
			throw new NotFoundError("item not found");
		}
	}

	static update(name, data) {
		for (let item of db.items) {
			if (item.name === name) {
				item.name = data.name;
				item.price = data.price;
				return item;
			}
		}

		throw new NotFoundError("item not found");
	}

	static delete(name) {
		for (let item of db.items) {
			if (item.name === name) {
				db.items = db.items.filter((i) => i.name !== name);
				return;
			}
		}
		throw new NotFoundError("item not found");
	}
}

module.exports = { Item };
