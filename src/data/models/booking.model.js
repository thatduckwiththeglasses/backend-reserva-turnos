import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
 {
 clientName: {
 type: String,
 required: true
 },
 clientEmail: {
 type: String,
 required: true
 },
 date: {
 type: Number,
 required: true
 },
 price: {
 type: Number,
 required: true
 },
 services: [
    {
        service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'services'
            },
        quantity: {
            type: Number,
            default: 1
        }
    }
 ]
 },
 {
 timestamps: true
 }
 );
 
export const BookingModel = mongoose.model('bookings', bookingSchema);