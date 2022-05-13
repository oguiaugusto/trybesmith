import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ProductService from './service';

interface IProductController {
  create: (req: Request, res: Response, next: NextFunction) =>
  Promise<Response<unknown, Record<string, unknown>> | undefined>;
  listAll: (_req: Request, res: Response, next: NextFunction) =>
  Promise<Response<unknown, Record<string, unknown>> | undefined>;
}

class ProductController implements IProductController {
  private service;

  constructor() {
    this.service = new ProductService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.service.create(req.body);
      return res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
      next(error);
    }
  };

  public listAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.service.listAll();
      return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
