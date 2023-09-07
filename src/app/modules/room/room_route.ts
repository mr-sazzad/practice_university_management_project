import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createRoom } from './room_controller';
import { create } from './room_validation';

const router = Router();

router.post('/create-room', validateRequest(create), createRoom);

export const roomRouter = router;
