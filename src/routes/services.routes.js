import { Router } from "express";
import { createService, editService, getAllServices, getService, removeService } from "../controllers/services.controller.js";

const routerServices = Router();

routerServices.get("/",getAllServices);

routerServices.get("/:id",getService);

routerServices.post("/", createService);

routerServices.put("/:id",editService);

routerServices.delete("/:id", removeService)

export default routerServices;
