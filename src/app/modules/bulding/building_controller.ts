import { RequestHandler } from 'express';
import pick from './../../../shared/pick';
import { buildingServices } from './building_service';

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

export const getAllBuildings: RequestHandler = async (req, res, next) => {
  try {
    const options = pick(req.query, [
      'page',
      'pageSize',
      'sortBy',
      'sortOrder',
    ]);
    const filters = pick(req.query, ['searchTerm', 'title']);

    const result = await buildingServices.getAllBuildings(options, filters);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Building Retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
