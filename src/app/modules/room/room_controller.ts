import { RequestHandler } from 'express';
import { roomServices } from './room_service';

export const createRoom: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await roomServices.createRoom(payload);

    res.status(201).json({
      statusCode: 201,
      success: true,
      message: 'Room Created successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getSingleRoom: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await roomServices.getSingleRoom(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Room Retrieved successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateSingleRoom: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const result = await roomServices.updateSingleRoom(id, payload);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Room Updated successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteSingleRoom: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await roomServices.deleteSingleRoom(id);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Room Deleted successfully !',
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
