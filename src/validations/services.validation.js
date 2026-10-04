import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z.string().min(2, 'El nombre es obligatorio'),
    description: z.string().min(5, 'La descripción es obligatoria'),
    duration: z.number().positive('La duración debe ser mayor a cero (0)'),
    price: z.number().min(0, 'El precio no puede ser negativo'),
    category: z.string().min(2, 'La categoria es obligatoria'),
    capacity: z.number().min(1, 'La capacidad tiene que ser de almenos 1 cliente'),
    reserved: z.number().min(0),
    available: z.boolean().optional()
});

export const updateServiceSchema = createServiceSchema.partial();