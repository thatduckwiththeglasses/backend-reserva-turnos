//src/app.js

import express from "express";
import { engine } from 'express-handlebars';

import { logger } from "./middlewares/logger.middleware.js";
import viewsRouter from './routes/views.router.js';
import routerServices from "./routes/services.routes.js";
import routerBookings from "./routes/bookings.routes.js";


 const app = express();

 app.use(express.json());
 app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
 app.use(logger);
 
 //routers
 app.use('/', viewsRouter);
 app.use("/api/services",routerServices);
 app.use("/api/bookings",routerBookings);

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