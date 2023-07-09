import { RequestHandler } from "express";
import classService from "../services/classService";
import percents from "../utils/percents";

const readOneClass: RequestHandler = async (req, res) => {
  const { idClass } = req.params;
  const id = parseInt(idClass, 10);
  return res.json(await classService.getOneClass(id));
};

const readClasses: RequestHandler = async (req, res) =>
  res.json(await classService.getAllClasses());

const readBySubject: RequestHandler = async (req, res) => {
  const { subjectCodeId } = req.params;
  return res.json(await classService.getClassBySubject(subjectCodeId));
};

const percent: RequestHandler = async (req, res) => {
  const studentsF = req.body.students;
  const placesF = req.body.places;
  const percentF = classService.classPercent(parseInt(studentsF, 10), parseInt(placesF, 10));
  return res.json({ percent: percentF, status: percents.classStatus(percentF) });
};

export default { readOneClass, readClasses, readBySubject, percent };
