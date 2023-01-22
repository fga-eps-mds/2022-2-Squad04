import prisma from "../src/prismaClient";

async function resetDatabase() {
  await prisma.building.deleteMany();
  await prisma.class.deleteMany();
  await prisma.room.deleteMany();
  await prisma.subject.deleteMany();

  await prisma.$executeRaw`TRUNCATE TABLE "Class" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Room" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Subject" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Building" RESTART IDENTITY CASCADE`;
}

async function mockBuilding() {
  await prisma.building.create({ data: { name: "RU", latitude: 0, longitude: 0 } });
}

async function mockSubject() {
  await prisma.class.create({
    data: {
      idClass: 1,
      teacher: "EDSON ALVES DA COSTA JUNIOR",
      timeAndDay: "46T23",
      subjects: { create: { codeId: "FGA0003", name: "COMPILADORES 1" } },
    },
  });
}

async function mockClass() {
  await prisma.building.create({ data: { name: "UAC", latitude: 0, longitude: 0 } });
  await prisma.room.create({
    data: {
      identification: "I1",
      level: 1,
      latitude: 0,
      longitude: 0,
      building: { connect: { name: "UAC" } },
    },
  });
  await prisma.class.create({
    data: {
      idClass: 1,
      teacher: "PROFESSOR MOTOCA",
      timeAndDay: "46T23",
      subjects: { create: { codeId: "FGA0074", name: "PED" } },
      room: { connect: { identification: "I1" } },
    },
  });
}

async function mockRooms() {
  await prisma.building.create({ data: { name: "UAC", latitude: 0, longitude: 0 } });
  await prisma.class.create({
    data: {
      idClass: 1,
      teacher: "PROFESSOR MOTOCA",
      timeAndDay: "46T23",
      subjects: { create: { codeId: "FGA0074", name: "PED" } },
      room: {
        create: {
          identification: "S1",
          level: 1,
          latitude: 0,
          longitude: 0,
          building: { connect: { name: "UAC" } },
        },
      },
    },
  });
}

export default { resetDatabase, mockBuilding, mockSubject, mockClass, mockRooms };
