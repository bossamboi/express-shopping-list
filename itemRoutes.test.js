"use strict";

const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let lunchables = { name: "lunchables blast pack", price: 4.99 };

beforeEach(function () {
	db.items.push(lunchables);
});

afterEach(function () {
	db.items = [];
});

/** GET /items - returns `{items: [{}, {} ...]}` */

describe("GET /items", function () {
	it("Gets a list item objects", async function () {
		const resp = await request(app).get(`/items`);

		expect(resp.body).toEqual({ items: [lunchables] });
	});
});

/** POST /items - create item from data; return `{added: item}` */

describe("POST /items", function () {
	it("Addes item to the item list", async function () {
		const resp = await request(app).post(`/items`).send({
			name: "almond milk",
			price: 5.99,
		});
		expect(resp.statusCode).toEqual(201);
		expect(resp.body).toEqual({
			added: {
				name: "almond milk",
				price: 5.99,
			},
		});
	});
});

/** GET /items/[name] - returns `{items}` */

describe("GET /items/:name", function () {
	it("Gets one item", async function () {
		const resp = await request(app).get(`/items/${lunchables.name}`);

		expect(resp.body).toEqual({ name: "lunchables blast pack", price: 4.99 });
	});

	it("Responds with 404 if name invalid", async function () {
		const resp = await request(app).get(`/items/house`);
		expect(resp.statusCode).toEqual(404);
	});
});

/** PATCH /items/[name] - update item; return `{updated: item}` */

describe("PATCH /items/:name", function () {
	it("Updates a single item", async function () {
		const resp = await request(app).patch(`/items/${lunchables.name}`).send({
			name: "lunchables pacific cooler",
			price: 7.99,
		});
		expect(resp.body).toEqual({
			updated: {
				name: "lunchables pacific cooler",
				price: 7.99,
			},
		});
	});

	it("Responds with 404 if name invalid", async function () {
		const resp = await request(app).patch(`/items/house`).send({
			name: "lunchables pacific cooler",
			price: 7.99,
		});
		expect(resp.statusCode).toEqual(404);
	});
});

/** DELETE /items/[name] - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function () {
	it("Deletes a single a item", async function () {
		const resp = await request(app).delete(`/items/${lunchables.name}`);

		expect(resp.body).toEqual({ message: "Deleted" });
		expect(db.items.length).toEqual(0);
	});

	it("Responds with 404 if name invalid", async function () {
		const resp = await request(app).delete(`/items/house`);
		expect(resp.statusCode).toEqual(404);
	});
});
