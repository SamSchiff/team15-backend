import { Router } from 'express';
import * as Controller from './controller';

const router = Router();

router.route('/test').get(Controller.testQuery);

export default router;
