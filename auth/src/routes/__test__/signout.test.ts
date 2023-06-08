import request from "supertest";
import { app } from "../../app";

const validEmail = "sample@sample.com";
const validPassword = "password";

describe("POST /api/users/signout", () => {
  beforeEach(async () => {
    await global.signup(validEmail, validPassword);
  });

  it("clears the cookie after signing out", async () => {
    const response = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
    expect(response.get("Set-Cookie")[0]).toEqual(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});
