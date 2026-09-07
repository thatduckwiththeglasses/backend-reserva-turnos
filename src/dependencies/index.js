import path from "node:path";
import { fileURLToPath } from "node:url";
import { ServiceDao } from "../dao/services.dao.js";
import { BookingDao } from "../dao/bookings.dao.js";
import { ServicesRepository } from "../repositories/services.repository.js";
import { ServicesService } from "../services/services.service.js";
import { BookingsRepository } from "../repositories/bookings.repository.js";
import { BookingsService } from "../services/bookings.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, "..", "data", "services.json");

const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");

const serviceDao = new ServiceDao(servicesPath);
const servicesRepository = new ServicesRepository(serviceDao);

export const servicesService = new ServicesService(servicesRepository);

const bookingDao = new BookingDao(bookingsPath,servicesPath);
const bookingsRepository = new BookingsRepository(bookingDao);

export const bookingsService = new BookingsService(bookingsRepository);