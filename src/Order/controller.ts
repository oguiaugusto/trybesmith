import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import OrderService from './service';

interface IOrderController {
  listAll: (_req: Request, res: Response, next: NextFunction) =>
  Promise<Response<unknown, Record<string, unknown>> | undefined>;
}

class OrderController implements IOrderController {
  private service;

  constructor() {
    this.service = new OrderService();
  }

  public listAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.service.listAll();
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
