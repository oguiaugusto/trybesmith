import { RowDataPacket } from 'mysql2/promise';
import { IProduct } from './interfaces';
import connection from '../models/connection';

interface IProductModel {
  listAll(): Promise<IProduct[]>
}

class ProductModel implements IProductModel {
  private connection;

  constructor() {
    this.connection = connection;
  }

  public listAll = async (): Promise<IProduct[]> => {
    const [products] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products;',
    );
    return products as IProduct[];
  };
}

export default ProductModel;
