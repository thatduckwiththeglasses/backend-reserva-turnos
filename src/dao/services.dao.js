import fs from "node:fs/promises";
import crypto from "crypto";

export class ServiceDao {

    constructor(path){
        this.path = path;
    }
    
    async #readAll() {
            try {
                const data = await fs.readFile(this.path, 'utf-8');
    
                return JSON.parse(data);
            } catch (error){
                return [];
            }
        };

    async #writeAll(servicesData) {
            const data = JSON.stringify(servicesData, null, 2)
            await fs.writeFile(this.path, data,`utf-8`);
        };

    
    async getAll(){
        return this.#readAll();
    };
    
    async create(data) {
        const services = await this.getAll();
        const ids = services.map((services) => services.id);

        const newService = {
            id: ids.length ? Math.max(...ids) + 1 : 1,
            ...data,
        };

        services.push(newService);

        await this.#writeAll(services);

        return newService;
    };
    
    async getById(serviceId) {
        const data = await this.getAll();
        return data.find((service) => service.id === Number(serviceId));
    };

    async edit(id, data) {
        const services = await this.getAll();

        const serviceIndex = services.findIndex((service) => service.id === id);

        if(serviceIndex === -1){
            return null
        };

        const updateService = {
                ...services[serviceIndex],
                ...data,
                id: services[serviceIndex].id
        };

        services[serviceIndex] = updateService;

        await this.#writeAll(services);

        return updateService;
    }

    async delete(serviceId) {
        const services = await this.getAll();
        
        const serviceIndex = services.findIndex((service) => service.id === serviceId);

        if(serviceIndex === -1){
            return null
        };

        const retiredService = services.splice(serviceIndex,1);

        await this.#writeAll(services);

        return retiredService[0];
    }
}