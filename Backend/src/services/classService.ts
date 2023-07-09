import HttpError from "http-errors";
import classRepository from "../repositories/classRepository";
import hourAndDay from "./generateHourAndDay";
import percents from "../utils/percents";

const getOneClass = async (id: number) => {
  const classOne: any = await classRepository.getOneClass(id);
  const newClass = {
    id: classOne[0].id,
    idClass: classOne[0].idClass,
    subjectCodeId: classOne[0].subjectCodeId,
    teacher: classOne[0].teacher,
    room: classOne[0].room,
    day: hourAndDay.parseDay(classOne[0].timeAndDay),
    time: hourAndDay.parseHour(classOne[0].timeAndDay),
  };
  return newClass;
};

const getAllClasses = async () => {
  const classes: any = await classRepository.getAllClasses();
  const newClass = classes.map((classOne: any) => ({
    id: classOne.id,
    idClass: classOne.idClass,
    subjectCodeId: classOne.subjectCodeId,
    teacher: classOne.teacher,
    room: classOne.room,
    day: hourAndDay.parseDay(classOne.timeAndDay),
    time: hourAndDay.parseHour(classOne.timeAndDay),
  }));
  return newClass;
};

const getClassBySubject = async (subjectCodeId: string) => {
  const classes = await classRepository.getClassBySubject(subjectCodeId);

  if (classes.length === 0) {
    throw new HttpError.NotFound();
  }

  const newClass = classes.map((classOne) => ({
    id: classOne.id,
    idClass: classOne.idClass,
    subjectCodeId: classOne.subjectCodeId,
    teacher: classOne.teacher,
    room: classOne.room,
    day: hourAndDay.parseDay(classOne.timeAndDay),
    time: hourAndDay.parseHour(classOne.timeAndDay),
  }));
  return newClass;
};

const classPercent = (studentsF: number, placesF: number) => {
  if (studentsF < 0 || placesF <= 0) throw new HttpError.BadRequest();
  return percents.percentC(studentsF, placesF);
};

export default { getOneClass, getAllClasses, getClassBySubject, classPercent };
