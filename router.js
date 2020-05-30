import { Router } from 'express';
import * as Controller from './controller';
import { requireAuth, requireSignin } from './passport';

const router = Router();

router.post('/signin', requireSignin, Controller.signin);

router.post('/signup', Controller.signup); // post for User

router.route('/user')
  .get(requireAuth, Controller.getUser)
  .put(requireAuth, Controller.updateUser)
  .delete(requireAuth, Controller.deleteUser);

router.route('/user/all')
  .get(requireAuth, Controller.getAllUsers);

router.route('/doctor')
  .get(requireAuth, Controller.getDoctor)
  .post(requireAuth, Controller.createDoctor)
  .put(requireAuth, Controller.assignDoctorToWard) // update which ward
  .delete(Controller.deletePerson);

router.route('/doctor/all')
  .get(requireAuth, Controller.getAllDoctors);

router.route('/patient')
  .get(requireAuth, Controller.getPatient)
  .post(requireAuth, Controller.createPatient)
  .put(requireAuth, Controller.checkInPatient) // update checkedIn
  .delete(requireAuth, Controller.deletePerson);

router.route('/patient/all')
  .get(requireAuth, Controller.getAllPatients);

router.route('/patient/bed')
  .put(requireAuth, Controller.assignPatientToBed); // connect a bedId to a patient

router.route('/doctor/ward')
  .put(requireAuth, Controller.assignDoctorToWard);

router.route('/ward')
  .get(requireAuth, Controller.getWard);

router.route('/ward/patients')
  .get(Controller.getWardPatients);

router.route('/ward/all')
  .get(requireAuth, Controller.getAllWards);

router.route('/bed')
  .get(requireAuth, Controller.getBed)
  .post(requireAuth, Controller.createBed)
  .delete(requireAuth, Controller.deleteBed);

export default router;
