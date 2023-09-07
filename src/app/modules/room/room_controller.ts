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
