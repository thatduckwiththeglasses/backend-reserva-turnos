import fs from "node:fs/promises";

const filePath = "./src/data/services.json";

const readServices = async () => {
    try {
        const data = await fs.readFile(filePath, `utf-8`);

        return JSON.parse(data);
    } catch (error){
        return [];
    }
};

const writeServices = async (services) => {
    await fs.writeFile(filePath, JSON.stringify(services, null, 2));
};

export const getServices = async () => {
    const services = await readServices();

    return services;
};

export const getServiceById = async (id) => {
    const services = await readServices();
    
    const service = services.find((service) => service.id === Number(id));

    if(!service) {
        return null;
    }
    
    return service;
};

export const addService = async (serviceData) => {
    const { name, description, duration, price, category, available } = serviceData;

    if(!name || !description || !duration || !price || !category) {
        return res.status(400).json({
            status: "--ERROR--",
            message: "Faltan campos obligatorios"
        });
    }

    const services = await readServices();

    const newService = {
        id: services.length > 0 ? services[services.length - 1].id +1 : 1,
        name,
        description,
        price,
        category,
        available: available ?? true
    };

    services.push(newService);

    await writeServices(services);

    return{
        status: "success",
        payload: newService,
    }
};

export const updateService = async (id, serviceData) => {
    const services = await readServices();

    const serviceIndex = services.findIndex((service) => service.id === Number(id));

    if(serviceIndex === -1){
        return {
            status: "--ERROR--",
            message: "Servicio no encontrado"
        };
    }

    const updateService = {
            ...services[serviceIndex],
            ...serviceData,
            id: services[serviceIndex].id
    };

    services[serviceIndex] = updateService;

    await writeServices(services);

    return{
        status: "success",
        payload: updateService
    }
};

export const deleteService = async (id) => {
    const services = await readServices();

    const serviceIndex = services.findIndex((service) => service.id === Number(id));

    if(serviceIndex === -1){
        return {
            status: "--ERROR--",
            message: "Servicio no encontrado"
        };
    }

    const deletedService = services.splice(serviceIndex,1);
    
    await writeServices(services);
    
    return{
        status: "success",
        payload: deletedService[0]
    }
}