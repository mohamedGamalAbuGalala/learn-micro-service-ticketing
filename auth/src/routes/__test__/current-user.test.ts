import request from "supertest";
import { app } from "../../app";

const validEmail = "sample@sample.com";
const validPassword = "password";
let cookie: string[];

describe("GET /api/users/currentuser", () => {
  beforeEach(async () => {
    cookie = await global.signup(validEmail, validPassword);
  });

  it("responds with details about the current user", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send({})
      .expect(200);

    expect(response.body.currentUser.email).toEqual(validEmail);
  });

  it("responds with null if not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .send({})
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });
});
