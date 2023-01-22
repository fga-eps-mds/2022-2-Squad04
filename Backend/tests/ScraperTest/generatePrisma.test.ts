import utils from "../Utils";
import generatePrisma from "../../src/scripts/generatePrisma";
import prisma from "../../src/prismaClient";

describe("Scrapper Sub-Functions", () => {
  beforeAll(async () => {
    await utils.resetDatabase();
  });
  it("Should seed the building table", async () => {
    await generatePrisma.generateBuildings();
    const result = await prisma.building.count();
    expect(result).toBeGreaterThan(0);
  });
  it("Should seed the rooms table", async () => {
    await generatePrisma.generateRooms();
    const result = await prisma.room.count();
    expect(result).toBeGreaterThan(0);
  });
});
