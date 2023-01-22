import req from "supertest";
import server from "../../src/server";
import utils from "../Utils";

describe("Subject Routes test", () => {
  beforeAll(async () => {
    await utils.resetDatabase();
    await utils.mockSubject();
  });

  it("should list all subjects", async () => {
    const response = await req(server).get("/api/subject/");
    expect(response.statusCode).toBe(200);
  });

  it("should list one subject", async () => {
    const response = await req(server).get("/api/subject/FGA0003");
    expect(response.statusCode).toBe(200);
    expect(response.body[0].name).toBe("COMPILADORES 1");
  });
  it("should return a 404 to a non existent subjects", async () => {
    const response = await req(server).get("/api/subject/aaaa");
    expect(response.statusCode).toBe(404);
  });
});
