import prisma from "../src/prismaClient";

async function seedDatabase() {
  await prisma.building.deleteMany();
  await prisma.class.deleteMany();
  await prisma.room.deleteMany();
  await prisma.subject.deleteMany();

  await prisma.$executeRaw`TRUNCATE TABLE "Class" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Room" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Subject" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Building" RESTART IDENTITY CASCADE`;

  await prisma.building.create({ data: { name: "RU", latitude: 0, longitude: 0 } });
  await prisma.building.create({ data: { name: "UAC", latitude: 0, longitude: 0 } });
  await prisma.class.create({
    data: {
      idClass: 1,
      teacher: "EDSON ALVES DA COSTA JUNIOR",
      timeAndDay: "46T23",
      subjectCodeId: "RU",
    },
  });
  await prisma.subject.create({
    data: { codeId: "FGA0003", name: "COMPILADORES 1", Class: { connect: { id: 1 } } },
  });
  await prisma.subject.create({
    data: {
      codeId: "FGA0074",
      name: "TEORIA DE ELETRÔNICA DIGITAL 2",
    },
  });
  await prisma.room.create({
    data: {
      identification: "S1",
      level: 2,
      latitude: 0,
      longitude: 0,
      buildingName: "UAC",
      class: { connect: { id: 1 } },
    },
  });
  // adicionar classe na S1
}

export default { seedDatabase };
