import req from "supertest";
import server from "../../src/server";
import utils from "../Utils";

describe("Class Routes test", () => {
  beforeAll(async () => {
    await utils.resetDatabase();
    await utils.mockClass();
  });

  it("should list all class", async () => {
    const response = await req(server).get("/api/class/");
    expect(response.statusCode).toBe(200);
  });

  it("should list one class", async () => {
    const response = await req(server).get("/api/class/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.room).toBeTruthy();
    expect(response.body.day).toBeTruthy();
    expect(response.body.time).toBeTruthy();
  });
  it("should list all classes from a subject", async () => {
    const response = await req(server).get("/api/class/subject/FGA0074");
    expect(response.statusCode).toBe(200);
  });
  it("should return a 404 to a non existing class in a subject", async () => {
    const response = await req(server).get("/api/class/subject/aaa");
    expect(response.statusCode).toBe(404);
  });
  it("should return 400 when a class does not exist", async () => {
    const response = await req(server).get("/api/class/aaa");
    expect(response.statusCode).toBe(400);
  });
});
