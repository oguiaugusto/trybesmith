import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import OrderService from './service';

type CreateRequest = Request & { user?: { id: number } };

interface IOrderController {
  listAll: (_req: Request, res: Response, next: NextFunction) =>
  Promise<Response<unknown, Record<string, unknown>> | undefined>;
  create: (_req: CreateRequest, res: Response, next: NextFunction) =>
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

  public create = async (req: CreateRequest, res: Response, next: NextFunction) => {
    try {
      if (req.user) {
        const { body: { productsIds }, user: { id: userId } } = req;
        const order = await this.service.create({ userId, productsIds });
  
        return res.status(StatusCodes.CREATED).json(order);
      }

      throw new Error('Internal Server Error');
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
