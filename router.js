import { Router } from 'express';
import * as Controller from './controller';

const router = Router();

router.route('/test').get(Controller.testQuery);

router.route('/doctor')
  .get()
  .post(Controller.createDoctor)
  .put() // update which ward
  .delete();

router.route('/doctor/all')
  .get();

router.route('/patient')
  .get()
  .post()
  .put() // update checkedIn
  .delete();

router.route('/patient/bed')
  .put(); // connect a bedId to a patient

router.route('/doctor/ward')
  .put();

router.route('/ward')
  .get();

router.route('/ward/all')
  .get();

router.route('/bed')
  .get()
  .post()
  .delete();

export default router;
