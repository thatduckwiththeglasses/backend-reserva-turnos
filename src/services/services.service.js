export class ServicesService {
    constructor(repository){
        this.repository = repository;
    }

    async getServices(query = {}) {
        const page = Number(query.page) > 0 ? Number(query.page) : 1;
        const limit = Number(query.limit) > 0 ? Number(query.limit) : 10;
        //const filter = {};
        const services = await this.repository.getAll(query.category,query.price,limit,page);

        return services;
    }

    async getServiceById(id) {
        const service = await this.repository.getById(id);
        if (!service) throw new Error("Servicio no encontrado");
        
        return service;
    }

    async createService(data) {
        const { name, description, duration, price, category, capacity, available } = data;

        if(!name || !description || !duration || !price || !category || available === undefined) throw new Error("Faltan campos obligatorios")
        if (typeof duration !== "number") throw new Error("Duration debe ser un numero")
         else {
            if (duration <= 0) throw new Error("Duration debe ser mayor que 0")
            }

        if (typeof available !== "boolean") throw new Error("Available debe ser un booleano");

        return this.repository.create({ name, description, duration, price, category, capacity, available })
    }

    async editService(id,data) {
        const updateService = this.repository.edit(id,data);

        return updateService;
    }

    async deleteService(id){
        const retiredService = this.repository.delete(id);

        return retiredService;
    }
}