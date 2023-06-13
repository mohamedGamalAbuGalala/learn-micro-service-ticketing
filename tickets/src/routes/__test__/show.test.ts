import request from "supertest";
import { app } from "../../app";

let cookie: string[];

describe("GET /api/tickets/:id", () => {
  beforeEach(async () => {
    cookie = global.signin();
  });

  it("returns a 404 if the ticket is not found", async () => {
    const id = global.generateId();

    await request(app).get(`/api/tickets/${id}`).send().expect(404);
  });

  it("returns the ticket if the ticket is found", async () => {
    const title = "asdf";
    const price = 20;
    const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", cookie)
      .send({
        title,
        price,
      });
    const ticketId = response.body.id;

    const ticketResponse = await request(app)
      .get(`/api/tickets/${ticketId}`)
      .send()
      .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
  });
});
