import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  var signup: (email: string, password: string) => Promise<string[]>;
}

global.signup = async (email: string, password: string) => {
  const authResponse = await request(app).post("/api/users/signup").send({
    email,
    password,
  });

  const cookie = authResponse.get("Set-Cookie");

  return cookie;
};
