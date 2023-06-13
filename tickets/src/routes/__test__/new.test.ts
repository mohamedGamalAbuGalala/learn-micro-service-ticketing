import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";

let cookie: string[];

describe("POST /api/tickets", () => {
  beforeEach(async () => {
    cookie = global.signin();
  });

  it("has a route handler listening to /api/users for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(404);
  });

  it("can only be accessed if the user is signed in", async () => {
    await request(app).post("/api/tickets").send({}).expect(401);
  });

  it("returns a status other than 401 if the user is signed in", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({});

    expect(response.status).not.toEqual(401);
  });

  it("returns an error if invalid title is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 10,
      })
      .expect(400);

    await request(app).post("/api/tickets").set("Cookie", cookie).send({
      price: 10,
    });
  });

  it("returns an error if invalid price is provided", async () => {
    await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title: "asdf",
        price: -10,
      })
      .expect(400);

    await request(app).post("/api/tickets").set("Cookie", cookie).send({
      title: "asdf",
    });
  });

  it("creates a ticket with valid inputs", async () => {
    const tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = "asdf";

    await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title,
        price: 20,
      })
      .expect(201);

    const newTickets = await Ticket.find({});
    expect(newTickets.length).toEqual(1);
    expect(newTickets[0].price).toEqual(20);
    expect(newTickets[0].title).toEqual(title);
  });
});
