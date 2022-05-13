import { StatusCodes } from 'http-status-codes';
import { IProduct } from './interfaces';
import ProductModel from './model';
import RequestError from '../utils/RequestError';

const messages = {
  ALREADY_EXISTS: 'Product already exists.',
};

interface IProductService {
  create: ({ name, amount }: IProduct) => Promise<IProduct>;
  listAll(): Promise<IProduct[]>;
}

class ProductService implements IProductService {
  private model;

  constructor() {
    this.model = new ProductModel();
  }

  public create = async ({ name, amount }: IProduct) => {
    const existingProduct = await this.model.getByNameAndAmount({ name, amount });
    if (existingProduct) throw new RequestError(messages.ALREADY_EXISTS, StatusCodes.CONFLICT);

    const product = await this.model.create({ name, amount });
    return product;
  };

  public listAll = async (): Promise<IProduct[]> => {
    const products = await this.model.listAll();
    return products;
  };
}

export default ProductService;
