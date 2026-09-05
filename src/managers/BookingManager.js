import fs from "node:fs/promises";
import { generateId, serviceManager } from "./index.js";

export class BookingManager {

    constructor(path,servicePath){
        this.path = path;
        this.servicePath = servicePath;
    };

    async readBookings() {
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
    
    async writeBookings(bookings) {
        const data = JSON.stringify(bookings, null, 2);
        await fs.writeFile(this.path, data,`utf-8`);
    };

    async getBookings(){
        const bookings = await this.readBookings();

        return bookings;
    }

    async getBookingById(id){
        
        const bookings = await this.readBookings();

        const booking = bookings.find((booking) => booking.id === Number(id));

        if(!booking){
            return null;
        }
        
        return booking;
    };
        
    async createBooking(bookingData){
       const bookings = await this.readBookings();

       const newBooking = {
           services: [],
            ...bookingData,
           id: generateId(bookings),
       };

       bookings.push(newBooking);

       await this.writeBookings(bookings);

       return newBooking;
    };

    async updateBooking(id, bookingData){
        const bookings = await this.readBookings();

        const bookingIndex = bookings.findIndex((booking) => booking.id === Number(id))

        if(bookingIndex === -1){
            return null
        }

        const updateBooking = {
            ...bookings[bookingIndex],
            ...bookingData,
            id: bookings[bookingIndex].id
        };

        bookings[bookingIndex] = updateBooking;

        await this.writeBookings(bookings);

        return updateBooking;
    };

    async addServiceToBooking(bookingId,serviceId){

        const booking = await this.getBookingById(bookingId);
        const addservice = await serviceManager.getServiceById(serviceId);

        if (!booking){
            return -1
        }
        if(!addservice){
            return null
        }

        const bookedServices = booking.services;
        const serviceIndex = bookedServices.findIndex((service) => service.service === Number(serviceId));
        
        if (serviceIndex === -1){
            bookedServices.push({
                service: addservice.id,
                quantity: 1
            });
        } else {
           bookedServices[serviceIndex].quantity += 1;
        }

        const updateData = {
                ...booking,
                services: bookedServices,
        };
        
        return await this.updateBooking(bookingId,updateData);

    };
}

export default BookingManager;