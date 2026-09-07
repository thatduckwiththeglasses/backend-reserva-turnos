import mongoose from 'mongoose';
 import config from './env.config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://juanpatriciomichelrodriguez_db_user:CODERPASS@cluster0.g3k0cex.mongodb.net/ecommerce-services?appName=Cluster0");
        console.log('Conexión a MongoDB exitosa');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};
