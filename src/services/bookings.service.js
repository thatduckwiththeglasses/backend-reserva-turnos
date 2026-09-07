import { servicesService } from "../dependencies/index.js";

export class BookingsService {
    constructor(repository){
        this.repository = repository;
    }

    async createBooking(data) {
        const { clientName, clientEmail, date, time, status, services } = data;

        if(!clientName || !clientEmail || !date || !time || !status || !services) {
            return res.status(400).json({
                status: "--ERROR--",
                message: "Faltan campos obligatorios"
            });
        };

        return await this.repository.create(data);
    };

    async getBooking(id) {
        const booking = await this.repository.getById(id);

        if(!booking) throw new Error("Reserva no encontrada");
               
        return booking;
    };

    async bookService(id,sid){
        const updateBooking = await this.getBooking(id);

        const addservice = await servicesService.getServiceById(sid);

        if(updateBooking === -1) throw new Error("Reserva no encontrada");
        
        if(!addservice) throw new Error("Servicio no encontrado");
        
        const bookedServices = updateBooking.services;
        const serviceIndex = bookedServices.findIndex((service) => service.service === Number(sid));
        
        if (serviceIndex === -1){
            bookedServices.push({
                service: addservice.id,
                quantity: 1
            });
        } else {
           bookedServices[serviceIndex].quantity += 1;
        }

        const updateData = {
                ...updateBooking,
                services: bookedServices,
        };
        return await this.repository.edit(id,updateData);
    }
}