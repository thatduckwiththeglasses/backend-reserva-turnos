import path from "node:path";
import { fileURLToPath } from "node:url";

import { ServiceManager } from "./ServiceManager.js";
import { BookingManager } from "./BookingManager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, "..", "data", "services.json");

const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");

export const generateId = ((services) => {
        if (services.length === 0){
            return 1;
        }

        const ids = services.map((service) => service.id);

        return Math.max(...ids) + 1;
        }
    );

export const serviceManager = new ServiceManager(servicesPath);
export const bookingManager = new BookingManager(bookingsPath, servicesPath);