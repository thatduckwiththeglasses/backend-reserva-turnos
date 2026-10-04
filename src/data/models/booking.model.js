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
 services: {
    type:[
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
    ],
    default: []
    }
 },
 {
 timestamps: true,
 versionKey: false
 }
 );
 
export const BookingModel = mongoose.model('bookings', bookingSchema);