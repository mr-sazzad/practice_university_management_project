import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createBuilding,
  deleteSingleBuilding,
  getAllBuildings,
  getSingleBuilding,
  updateSingleBuilding,
} from './building_controller';
import { create } from './building_validation';

const router = Router();

router.post('/create-building', validateRequest(create), createBuilding);

router.get('/', getAllBuildings);

router.get('/:id', getSingleBuilding);

router.patch('/:id', updateSingleBuilding);

router.delete('/:id', deleteSingleBuilding);

export const buildingRoutes = router;
