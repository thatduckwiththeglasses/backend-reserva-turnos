import fs from "node:fs/promises";
import { generateId } from "./index.js";

export class ServiceManager {
    
    constructor(dao) {
        this.dao = dao;
    }

    async writeServices(services) {
        const data = JSON.stringify(services, null, 2)
        await fs.writeFile(this.path, data,`utf-8`);
    };

    async getServices() {
        const services = await this.readServices();

        return services;
    };

    async getServiceById(id){
        const services = await this.readServices();

        const service = services.find((service) => service.id === Number(id));

        if(!service) {
            return null;
        }

        return service;
    };

    async addService(serviceData) {
        
        const services = await this.readServices();

        const newService = {
            ...serviceData,
            id: generateId(services),
        };

        services.push(newService);

        await this.writeServices(services);

        return newService;
    };

    async updateService(id, serviceData) {
        const services = await this.readServices();

        const serviceIndex = services.findIndex((service) => service.id === Number(id));

        if(serviceIndex === -1){
            return null
        }

        const updateService = {
                ...services[serviceIndex],
                ...serviceData,
                id: services[serviceIndex].id
        };

        services[serviceIndex] = updateService;

        await this.writeServices(services);

        return updateService;
    };

    async deleteService(id) {
        const services = await this.readServices();

        const serviceIndex = services.findIndex((service) => service.id === Number(id));

        if(serviceIndex === -1){
            return null
        }

        const deletedService = services.splice(serviceIndex,1);

        await this.writeServices(services);

        return deletedService[0];
    }
}

export default ServiceManager;