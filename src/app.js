//src/app.js

import express from "express";
import { logger } from "./middlewares/logger.middleware.js";
import routerServices from "./routes/services.routes.js";


 const app = express();

 app.use(express.json());
 app.use(logger);
 
 //routers
 app.use("/api/services",routerServices);

app.get("/",(req, res) => {
    res.status(200).json({
        status: "success",
        message: "Servidor Inicializado",
        version: "0.0.1",
    });
});

//Los routers pueden estar aca

//Error Handle
app.use((req, res) => {
    res.status(404).json({
        status: "--ERROR--",
        message: `La ruta ${req.method} ${req.url} no existe`
    });
});



 export default app;