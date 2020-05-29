import { Router } from 'express';
import * as Controller from './controller';
import { requireAuth, requireSignin } from './passport';

const router = Router();

router.post('/signin', requireSignin, Controller.signin);

router.post('/signup', Controller.signup); // post for User

router.route('/user')
  .get(Controller.getUser)
  .put(Controller.updateUser)
  .delete(Controller.deleteUser);

router.route('/user/all')
  .get(requireAuth, Controller.getAllUsers);

router.route('/doctor')
  .get(Controller.getDoctor)
  .post(Controller.createDoctor)
  .put(Controller.assignDoctorToWard) // update which ward
  .delete(Controller.deletePerson);

router.route('/doctor/all')
  .get(Controller.getAllDoctors);

router.route('/patient')
  .get(Controller.getPatient)
  .post(Controller.createPatient)
  .put(Controller.checkInPatient) // update checkedIn
  .delete(Controller.deletePerson);

router.route('/patient/all')
  .get(Controller.getAllPatients);

router.route('/patient/bed')
  .put(Controller.assignPatientToBed); // connect a bedId to a patient

router.route('/doctor/ward')
  .put(Controller.assignDoctorToWard);

router.route('/ward')
  .get(Controller.getWard);

router.route('/ward/all')
  .get(Controller.getAllWards);

router.route('/bed')
  .get(Controller.getBed)
  .post(Controller.createBed)
  .delete(Controller.deleteBed);

export default router;
