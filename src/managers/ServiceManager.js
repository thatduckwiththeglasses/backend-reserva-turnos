import fs from "node:fs/promises";

export class ServiceManager {
    
    constructor(path) {
        this.path = path
    }

    async readServices() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');

            return JSON.parse(data);
        } catch (error){
            if (error.code === "ENOENT"){
                return [];
            } else {
                return {
                    status: "ERROR",
                    message: "No se pudo leer el archivo"
                };
            }
        }
    };

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
            id: this.generateId(services),
            ...serviceData,
        };

        services.push(newService);

        await this.writeServices(services);

        return newService;
    };

    generateId(services) {
        if (services.length === 0){
            return 1;
        }

        const ids = services.map((service) => service.id);

        return Math.max(...ids) + 1;
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