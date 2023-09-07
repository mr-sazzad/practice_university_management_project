import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createBuilding, getAllBuildings } from './building_controller';
import { create } from './building_validation';

const router = Router();

router.post('/create-building', validateRequest(create), createBuilding);

router.get('/', getAllBuildings);

export const buildingRoutes = router;
