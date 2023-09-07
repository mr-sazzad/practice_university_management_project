import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createRoom,
  deleteSingleRoom,
  getSingleRoom,
  updateSingleRoom,
} from './room_controller';
import { create } from './room_validation';

const router = Router();

router.post('/create-room', validateRequest(create), createRoom);

// router.post('/', getSingleRoom);

router.get('/:id', getSingleRoom);

router.patch('/:id', updateSingleRoom);

router.delete('/:id', deleteSingleRoom);

export const roomRoutes = router;
