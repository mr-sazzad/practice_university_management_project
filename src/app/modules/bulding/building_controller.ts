import { RequestHandler } from 'express';
import { buildingServices } from './bulding_service';

export const createBuilding: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await buildingServices.createBuilding(payload);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Building Created successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
