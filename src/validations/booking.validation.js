import { Joi } from 'joi';

export const bookingSchema = Joi.object({
 clientName: Joi.string().required(),
 clientEmail: Joi.string().required(),
 date: Joi.number().required(),
 time: Joi.number().required(),
 services: Joi.array({
    quantity: Joi.number().int().positive()
 })
 });

 export const updateBookingSchema = bookingSchema.partial();