import dotenv from 'dotenv';

dotenv.config()

const config = {
    port: Number(process.env.PORT) || 8080,
    nodeEnv: process.env.NODE_ENV,
    appName: process.env.APP_NAME || 'Sistema Backend de Turnos y Reservas',
    appEnv: process.env.APP_ENV || 'development',
    mongoUri: process.env.MONGO_URI
}

if(!process.env.PORT){
    console.error('Falta definir el puerto en las variables de entorno')
    process.exit(1)
}
if(!process.env.NODE_ENV){
    console.error('Falta definir el entorno del servidor')
    process.exit(1)
}
if (!config.mongoUri) {
 throw new Error('Falta configurar MONGO_URI en las variables de entorno');
}

export default config;