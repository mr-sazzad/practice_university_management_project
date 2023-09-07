import { Router } from 'express';
import { createRoom } from './room_controller';

const router = Router();

router.post('/create-room', createRoom);

export const roomRouter = router;
