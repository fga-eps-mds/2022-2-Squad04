import req from "supertest";
import server from "../../src/server";
import utils from "../Utils";

describe("Building Routes test", () => {
  beforeAll(async () => {
    await utils.resetDatabase();
    await utils.mockBuilding();
  });

  it("should list all buildings", async () => {
    const response = await req(server).get("/api/building/");
    expect(response.statusCode).toBe(200);
  });

  it("should list one building", async () => {
    const response = await req(server).get("/api/building/RU");
    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe("RU");
  });
  it("should return a 404 to a non existing building", async () => {
    const response = await req(server).get("/api/building/aaa");
    expect(response.statusCode).toBe(404);
  });
});
