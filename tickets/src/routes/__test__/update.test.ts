import request from "supertest";
import { app } from "../../app";

let cookie: string[];

describe("PUT /api/tickets/:id", () => {
  beforeEach(async () => {
    cookie = global.signin();
  });

  it("returns a 404 if the provided id does not exist", async () => {
    const id = global.generateId();
    await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", cookie)
      .send({
        title: "asdf",
        price: 20,
      })
      .expect(404);
  });

  it("returns a 401 if the user is not authenticated", async () => {
    const id = global.generateId();
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
        title: "asdf",
        price: 20,
      })
      .expect(401);
  });

  it("returns a 401 if the user does not own the ticket", async () => {
    const title = "asdf";
    const price = 20;
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title,
        price,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", global.signin())
      .send({
        title: "new title",
        price: 1000,
      })
      .expect(401);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });

  it("returns a 400 if the user provides an invalid title or price", async () => {
    const title = "asdf";
    const price = 20;
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title,
        price,
      });

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "",
        price: 1000,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        price: 1000,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "new title",
        price: -1000,
      })
      .expect(400);

    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: "new title",
      })
      .expect(400);
  });

  it("updates the ticket provided valid inputs", async () => {
    const title = "asdf";
    const price = 20;
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title,
        price,
      });

    const newTitle = "new title";
    const newPrice = 1000;
    await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set("Cookie", cookie)
      .send({
        title: newTitle,
        price: newPrice,
      })
      .expect(200);

    const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send();

    expect(ticketResponse.body.title).toEqual(newTitle);
    expect(ticketResponse.body.price).toEqual(newPrice);
  });
});
