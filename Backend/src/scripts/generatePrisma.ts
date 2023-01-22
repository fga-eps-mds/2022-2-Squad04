import prisma from "../prismaClient";
import places from "./utils";

// Jogar dados de matérias para o banco de dados
const generateSubject: any = async (codigoNome: String[]) => {
  const subjects = Array.from(codigoNome).map((el) => ({
    codeId: el.split("-")[0].trim(),
    name: el.split("-")[1].trim(),
  }));
  await prisma.subject.createMany({ data: subjects });
  /* eslint-disable*/
  console.log("Subjects Geradas");
};

// Jogar dados de prédios para o banco de dados
const generateBuildings = async () => {
  const arrays = [];

  for (let i = 0; i < places.buildings.length; i += 1) {
    const build = {
      name: places.buildings[i],
      latitude: places.latBuildings[i],
      longitude: places.longBuildings[i],
    };
    arrays.push(build);
  }

  await prisma.building.createMany({ data: arrays });
  console.log("Buildings Geradas");
};

// Jogar dados de salas para o banco de dados
const generateRooms = async () => {
  const array = [];
  for (let i = 0; i < places.places.length; i += 1) {
    const room = {
      identification: places.places[i],
      level: places.levels[i],
      latitude: places.latRooms[i],
      longitude: places.logRooms[i],
      buildingName: places.pareamentoBuilding[i],
    };
    array.push(room);
  }
  await prisma.room.createMany({ data: array });
  console.log("Rooms Geradas");
};

// Jogar dados de turmas para o banco de dados, exige uma maior tratativa de dados
const generateClass = async (
  codigoNome: String[],
  matrizRef: String[],
  nome: String[],
  local: String[],
  turma: String[],
  horario: String[]
) => {
  // Gerar código das matérias
  const newCodigonome = codigoNome.map((codigo) => codigo.split(" ")[0].trim());

  // Gerar professores das matérias
  const teacher = nome.map((prof) => prof.split("(")[0].trim());

  // Gerar salas das matérias, aqui, temos um caso especifico, no qual
  // se a matéria tiver dois locais, eles não podem ser em LAB NEI e LAB NEI 2
  // então há esse tratamento de dados
  const room = [];
  for (let i = 0; i < local.length; i += 1) {
    const roomS = [];
    for (let j = 0; j < places.places.length; j += 1) {
      if (local[i].includes(places.places[j])) {
        roomS.push(places.places[j]);
      }
    }

    if (roomS.length === 2 && roomS[1] === "LAB NEI 2") {
      roomS.shift();
    }
    room.push(roomS);
  }

  // Criação de uma matriz auxiliar para parear as matérias as turmas
  let contador = 0;
  const matrizNum = [];
  for (let h = 0; h < matrizRef.length; h += 1) {
    if (matrizRef[h] === "agrupador") {
      matrizNum.push(contador);
      contador = 0;
    }
    if (matrizRef[h] === "linhaPar" || matrizRef[h] === "linhaImpar") {
      contador += 1;
    }
  }
  matrizNum.shift();

  // Criação do array de matérias e do array de room-subject
  const secondR = [];
  const tudo = [];
  let helper = 0;
  for (let h = 0; h < turma.length; h += 1) {
    const retorno = {
      idClass: parseInt(turma[h] as string, 10),
      timeAndDay: horario[h] as string,
      teacher: teacher[h],
      subjectCodeId: newCodigonome[helper],
    };

    matrizNum[helper] -= 1;
    if (matrizNum[helper] === 0) {
      helper += 1;
    }
    const second = {
      idClass: parseInt(turma[h] as string, 10),
      room: room[h],
    };

    secondR.push(second);
    tudo.push(retorno);
  }

  // Jogando dados no banco
  await prisma.class.createMany({ data: tudo });

  for (let y = 1; y < turma.length; y += 1) {
    /* eslint-disable no-await-in-loop */
    await prisma.class.update({
      where: { id: y },
      data: {
        room: {
          connect: room[y - 1].map((identification: string) => ({
            identification,
          })),
        },
      },
    });
  }
  console.log("Classes Geradas");
};

export default { generateSubject, generateClass, generateBuildings, generateRooms };
