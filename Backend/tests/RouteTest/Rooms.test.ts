import req from "supertest";
import server from "../../src/server";
import utils from "../Utils";

describe("Rooms Routes test", () => {
  beforeAll(async () => {
    await utils.resetDatabase();
    await utils.mockRooms();
  });

  it("should list all rooms", async () => {
    const response = await req(server).get("/api/rooms/");
    expect(response.statusCode).toBe(200);
  });

  it("should list one room", async () => {
    const response = await req(server).get("/api/rooms/S1");
    expect(response.statusCode).toBe(200);
    expect(response.body[0].buildingName).toBe("UAC");
    expect(response.body[0].class.length).toBeGreaterThan(0);
  });
  it("should return 404 to a non existent room", async () => {
    const response = await req(server).get("/api/rooms/aaa");
    expect(response.statusCode).toBe(404);
  });
});
