import { Router } from "express";
import controller from "../controllers/classController";

const routes = Router();

routes.get("/", controller.readClasses);
routes.get("/:idClass", controller.readOneClass);
routes.get("/subject/:subjectCodeId", controller.readBySubject);
routes.post("/percent", controller.percent);

export default routes;
