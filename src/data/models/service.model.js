import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const serviceSchema = new mongoose.Schema(
 {
 name: {
 type: String,
 required: true
 },
 description: {
 type: String,
 required: true
 },
 duration: {
 type: Number,
 required: true
 },
 price: {
 type: Number,
 required: true
 },
 category: {
 type: String,
 required: true,
 lowercase: true,
 enum: ["deportes","musica","programacion","games","juegos","varios","test"]
 },
 capacity:{
    type: Number,
    required: true,
    min:1
 },
 reserved:{
    type: Number,
    default:0,
    min:0
 },
 available: {
 type: Boolean,
 default: true
 }
 },
 {
 timestamps: true,
 versionKey: false
 }
 );
 

serviceSchema.index({ name: 1 }, { unique: true });
serviceSchema.index({ description: "text" });
serviceSchema.index({ price: 1 });
serviceSchema.index({ category: 1 });

serviceSchema.index({ price: 1, category: 1 });

serviceSchema.plugin(paginate);

export const ServiceModel = mongoose.model('services', serviceSchema);

