//src/app.js

import express from "express";
import { engine } from 'express-handlebars';

import http from 'http';
import { Server } from 'socket.io';

import { logger } from "./middlewares/logger.middleware.js";
import viewsRouter from './routes/views.router.js';
import routerServices from "./routes/services.routes.js";
import routerBookings from "./routes/bookings.routes.js";
import { servicesService } from "./dependencies/index.js";


 const app = express();
 const server = http.createServer(app);
const io = new Server(server);

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

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.emit("welcome", {message: "bienvenido"})
  socket.on("update service", async ({ id, available }) => {
    await servicesService.editService(id, available);
    const services = await servicesService.getServices();

    io.emit("updated services", { services })

  })
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

 export default app;