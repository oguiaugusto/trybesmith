import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import ProductService from './service';

interface IProductController {
  listAll(_req: Request, res: Response, next: NextFunction):
  Promise<Response<unknown, Record<string, unknown>> | undefined>
}

class ProductController implements IProductController {
  private service;

  constructor() {
    this.service = new ProductService();
  }

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
