export class ServicesService {
    constructor(repository){
        this.repository = repository;
    }

    async getServices({category, price, available} = {}) {
        const services = await this.repository.getAll();

        if(category) {
            services = services.filter(
                (services) => services.category === category
            )
        }

        if(price) {
            services = services.filter(
                (services) => services.price === price
            );
        }

        if(available !== undefined) {
            const availableBoolean = available === "true";
            services = services.filter(
                (services) => services.available === availableBoolean
            );
        }

        return services;
    }

    async getServiceById(id) {
        const service = await this.repository.getById(id);
        if (!service) throw new Error("Servicio no encontrado");
        
        return service;
    }

    async createService(data) {
        const { name, description, duration, price, category, available } = data;

        if(!name || !description || !duration || !price || !category || available === undefined) {
            return res.status(400).json({
                status: "--ERROR--",
                message: "Faltan campos obligatorios"
            });
        }
        if (typeof duration !== "number"){
            return res.status(400).json({
                status: "--ERROR--",
                message: "Duration debe ser un numero"
            });
        } else {
            if (duration <= 0){
                return res.status(400).json({
                    status: "--ERROR--",
                    message: "Duration debe ser mayor que 0"
                });
            }
        }

        if (typeof available !== "boolean"){
            return res.status(400).json({
                status: "--ERROR--",
                message: "Available debe ser un booleano"
            });
        } 

        return this.repository.create({ name, description, duration, price, category, available })
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