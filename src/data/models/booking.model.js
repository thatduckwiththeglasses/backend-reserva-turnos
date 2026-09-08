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
 time: {
 type: Number,
 required: true
 },
 services: [
    {
        service: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'services',
                required: false
            },
        quantity: {
            type: Number,
            default: 1,
            required: false
        }
    }
 ]
 },
 {
 timestamps: true
 }
 );
 
export const BookingModel = mongoose.model('bookings', bookingSchema);