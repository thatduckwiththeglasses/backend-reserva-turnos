import path from "node:path";
import { fileURLToPath } from "node:url";
import { ServicesMongoDao } from "../dao/mongo/services.mongodb.dao.js";
import { BookingsMongoDao } from "../dao/mongo/bookings.mongodb.dao.js";
import { ServicesRepository } from "../repositories/services.repository.js";
import { ServicesService } from "../services/services.service.js";
import { BookingsRepository } from "../repositories/bookings.repository.js";
import { BookingsService } from "../services/bookings.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servicesPath = path.join(__dirname, "..", "data", "services.json");

const bookingsPath = path.join(__dirname, "..", "data", "bookings.json");

const serviceDao = new ServicesMongoDao();
const servicesRepository = new ServicesRepository(serviceDao);

export const servicesService = new ServicesService(servicesRepository);

const bookingDao = new BookingsMongoDao();
const bookingsRepository = new BookingsRepository(bookingDao);

export const bookingsService = new BookingsService(bookingsRepository);