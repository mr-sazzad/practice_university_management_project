import { Router } from 'express';
import { createBuilding } from './building_controller';

const router = Router();

router.post('/create-building', createBuilding);

export const buildingRouter = router;
