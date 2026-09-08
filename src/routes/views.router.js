import { Router } from 'express';


import { servicesService , bookingsService } from '../dependencies/index.js';



const router = Router();


router.get("/", (req, res) => {
  res.render('home');
});

router.get('/services', async (req, res) => {
  try {
      const services = await servicesService.getServices(req.body);

      res.render('services', {
        services
      });
  } catch(error){
    next(error)
  };
});

router.get('/bookings', async (req, res) => {
  const bookings = await bookingsService.getBooking(req.params);

  res.render('bookings', {
    bookings
  });
});


export default router;
