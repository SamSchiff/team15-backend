import { Router } from 'express';
import * as Controller from './controller';

const router = Router();


router.route('/doctor')
  .get(Controller.getDoctor)
  .post(Controller.createDoctor)
  .put() // update which ward
  .delete();

router.route('/doctor/all')
  .get(Controller.getAllDoctors);

router.route('/patient')
  .get(Controller.getPatient)
  .post(Controller.createPatient)
  .put() // update checkedIn
  .delete();

router.route('/patient/all')
  .get(Controller.getAllPatients);

router.route('/patient/bed')
  .put(); // connect a bedId to a patient

router.route('/doctor/ward')
  .put();

router.route('/ward')
  .get();

router.route('/ward/all')
  .get(Controller.getAllWards);

router.route('/bed')
  .get()
  .post()
  .delete();

export default router;
