import { Router } from 'express';


import { servicesService } from '../dependencies/index.js';



const router = Router();


router.get('/services', async (req, res) => {
  const services = await servicesService.getServices();

  res.render('services', {
    services
  });
});




export default router;
