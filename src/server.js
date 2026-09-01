//src/server.js
import http from 'http';
import config from './config/env.config.js';
import { services } from './data/services.js';
import { sendResponse } from './utils/sendResponse.js';

import { app } from './app.js';


console.log('Aplicación inicializada');
 console.log(app);

const server = http.createServer((req, res) => {
    
    const { method, url } = req;

    console.info(`${method}, ${url}`);

    if(method === 'GET' && url === '/'){
        return sendResponse(res, 200, {
            status: "Server Iniciado",
        })
    }
    
    if(method === 'GET' && url === '/api/services'){
        return sendResponse(res, 200, {
            status: "success",
            payload: services
        })
    }

});

server.listen(config.port, () => {
    console.log(`Servidor escuchando en http://localhost:${config.port}`)
});
