import { Router } from "express";
import { services } from "../data/services.js";

const routerServices = Router();

routerServices.get("/",(req, res) => {
    
    const { category, price , available } = req.query;

    let filteredServices = services

    if(category) {
        filteredServices = filteredServices.filter(
            (service) => service.category.toLocaleLowerCase() === category.toLocaleLowerCase()
        );
    };

    if(price) {
        filteredServices = filteredServices.filter(
            (service) => service.price === Number(price)
        );
    };

    if(available) {
        filteredServices = filteredServices.filter(
            (service) => service.available === (available === 'true')
        );
    };

    if (filteredServices.length === 0){
        res.status(404).json({
        status: "---ERROR---",
        message: "No se encontraron resultados en base a tus filtros",
        });
    } else { 
        res.status(200).json({
            status: "sucess",
            count: filteredServices.length,
            payload: filteredServices,
        });
    }
   
});

routerServices.get("/:id",(req, res) => {
    const { id } = req.params;

    const service = services.find((service) => service.id === Number(id));

    if (!service){
        res.status(404).json({
        status: "---ERROR---",
        message: "No se encontro el servicio",
        });
    } else { 
        res.status(200).json({
            status: "sucess",
            payload: service,
        });
    }
});

export default routerServices;
