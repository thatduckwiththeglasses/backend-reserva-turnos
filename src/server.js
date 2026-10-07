import server from "./app.js";
import config from "./config/env.config.js";
import { connectDB } from './config/database.config.js';

const startServer = async () => {
    await connectDB();
    
    server.listen(config.port, () => {
        console.log(`Servidor escuchando en http://localhost:${config.port}`)
    });
};
startServer();



