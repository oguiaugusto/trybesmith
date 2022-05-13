import ProductModel from './model';
import { IProduct } from './interfaces';

interface IProductService {
  listAll(): Promise<IProduct[]>
}

class ProductService implements IProductService {
  private model;

  constructor() {
    this.model = new ProductModel();
  }

  public listAll = async (): Promise<IProduct[]> => {
    const products = await this.model.listAll();
    return products;
  };
}

export default ProductService;
