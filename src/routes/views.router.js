import { Router } from 'express';


import { servicesService , bookingsService } from '../dependencies/index.js';



const router = Router();


router.get("/", (req, res) => {
  res.render('home');
});

router.get('/services', async (req, res) => {
  try {
      const services = await servicesService.getServices(req.body);

      res.render('services', { services });
  } catch(error){
    console.log(error)
  };
});

router.get('/bookings', async (req, res) => {
  try{
    const bookings = await bookingsService.getReport();
    console.log(bookings)
    res.render('bookings', {
      bookings
    });
  } catch(error) {
    console.log(error)
  }
});

router.get('/bookings/:id', async (req, res) => {
  try{
    const { id } = req.params
    const booking = await bookingsService.getBooking(id);

    res.render('booking', { booking });
  } catch(error) {
    console.log(error)
  }
})


export default router;
