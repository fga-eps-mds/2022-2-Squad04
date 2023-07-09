import req from "supertest";
import server from "../../src/server";

describe("Ocupation Class tests", () => {
  it("should return the correct percent when we divide 130 by 140", async () => {
    const input = { places: "140", students: "130" };
    const response = await req(server).post("/api/class/percent").send(input);
    expect(response.body.percent).toBe("0.93");
  });
  it("should return a error because we cant divide by a negative number", async () => {
    const input = { places: "-140", students: "130" };
    const response = await req(server).post("/api/class/percent").send(input);
    expect(response.statusCode).toBe(400);
  });
  it("should return a error because we cant divide by zero", async () => {
    const input = { places: "0", students: "130" };
    const response = await req(server).post("/api/class/percent").send(input);
    expect(response.statusCode).toBe(400);
  });
  it("should return a string with 'há vagas'", async () => {
    const input = { places: "140", students: "130" };
    const response = await req(server).post("/api/class/percent").send(input);
    expect(response.body.status).toStrictEqual("Há vagas");
  });
  it("should return a string with 'ocupada'", async () => {
    const input = { places: "140", students: "140" };
    const response = await req(server).post("/api/class/percent").send(input);
    expect(response.body.status).toStrictEqual("Ocupada");
  });
  it("should return a string with 'Vazia'", async () => {
    const input = { places: "140", students: "0" };
    const response = await req(server).post("/api/class/percent").send(input);
    expect(response.body.status).toStrictEqual("Vazia");
  });
});
