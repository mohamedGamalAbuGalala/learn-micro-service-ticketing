import request from "supertest";
import { app } from "../../app";

const validEmail = "sample@sample.com";
const validPassword = "password";
const invalidEmail = "sample";
const invalidPassword = "";
const notFoundEmail = "user@sample.com";
const incorrectPassword = "incorrect";

describe("POST /api/users/signin", () => {
  beforeEach(async () => {
    await global.signup(validEmail, validPassword);
  });

  it("returns a 200 on successful signin", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "sample@sample.com",
        password: "password",
      })
      .expect(200);
  });

  it("returns a 400 with an invalid email", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: invalidEmail,
        password: validPassword,
      })
      .expect(400);
  });

  it("returns a 400 with an invalid password", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: validEmail,
        password: invalidPassword,
      })
      .expect(400);
  });

  it("returns a 400 with missing email and password", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: validEmail,
      })
      .expect(400);

    await request(app)
      .post("/api/users/signin")
      .send({
        password: validPassword,
      })
      .expect(400);

    await request(app).post("/api/users/signin").send({}).expect(400);
  });

  it("returns a 400 with incorrect password", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: validEmail,
        password: incorrectPassword,
      })
      .expect(400);
  });

  it("returns a 400 with not found email", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: notFoundEmail,
        password: validPassword,
      })
      .expect(400);
  });

  it("sets a cookie after successful signin", async () => {
    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: validEmail,
        password: validPassword,
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
