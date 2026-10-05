import { servicesService } from "../dependencies/index.js";

export class BookingsService {
    constructor(repository){
        this.repository = repository;
    }

    async createBooking(data) {
        const { clientName, clientEmail, date, time, services } = data;

        if(!clientName || !clientEmail || !date || !time ) {
            return res.status(400).json({
                status: "--ERROR--",
                message: "Faltan campos obligatorios"
            });
        };

        if (!services){
            return await this.repository.create(data);
        } else throw new Error("No se puede agregar servicios en la creacion de cuenta")
    };

    async getBooking(id) {
        const booking = await this.repository.getById(id);

        if(!booking) throw new Error("Reserva no encontrada");
               
        return booking;
    };

    async bookService(id,sid, quantity = 1){
        const updateBooking = await this.getBooking(id);

        const addservice = await servicesService.getServiceById(sid);

        if(updateBooking === -1) throw new Error("Reserva no encontrada");
        
        if(!addservice) throw new Error("Servicio no encontrado");
        
        const bookedServices = updateBooking.services;
        const serviceIndex = bookedServices.findIndex((service) => service.service == sid);

        if(addservice.reserved + quantity > addservice.capacity) throw new Error("No hay lugares suficientes para esta reserva")

        if (serviceIndex === -1){
            bookedServices.push({
                service: addservice.id,
                quantity: 1
            });
        } else {
           bookedServices[serviceIndex].quantity += quantity;
        }

        addservice.reserved += 1

        const updatedService = await servicesService.editService(sid,addservice)
        if(!updatedService) throw new Error("No hay lugares suficientes para reservar")

        const updateData = {
                ...updateBooking,
                services: bookedServices,
        };
        return await this.repository.edit(id,updateData);
    }

    async cancelBooking(id, sid) {
        
        const booking = await this.repository.getById(id);
        
        if(!booking) throw new Error("Reserva no encontrada");
     
         // getById hace populate: service es el documento completo
        const bookedServices = booking.services;
        const serviceIndex = bookedServices.findIndex((service) => service.service == sid);
        const released = await servicesService.getServiceById(sid)

        if (!released) throw new Error("No se pueden liberar más cupos de los reservados");
        released.reserved -= 1;
        if (serviceIndex === -1) throw new Error("No tienes reservas de este servicio")
        
        const bookedQuantity = bookedServices[serviceIndex].quantity
        
        if (bookedQuantity <= 1) {
            const updatedBookedServs = bookedServices.filter((service) => service.service != sid)
        
            const updateData = {
                ...booking,
                services: updatedBookedServs,
            }

            await servicesService.editService(sid, released);
            
            return await this.repository.edit(id,updateData);
        }
        
        bookedServices[serviceIndex].quantity -= 1
        
        const updateData = {
                ...booking,
                services: bookedServices,
            }
        
        await servicesService.editService(sid, released);
        
        return await this.repository.edit(id,updateData);
    }       

    async deleteClient(id) {
        return await this.repository.delete(id);
    }

    async getReport() {
        return this.repository.getAll();
    }
}