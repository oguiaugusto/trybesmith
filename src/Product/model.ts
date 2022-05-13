import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { IProduct } from './interfaces';
import connection from '../models/connection';

interface IProductModel {
  create: ({ name, amount }: IProduct) => Promise<IProduct>;
  listAll(): Promise<IProduct[]>;
  getByNameAndAmount: ({ name, amount }: IProduct) => Promise<IProduct | null>;
}

class ProductModel implements IProductModel {
  private connection;

  constructor() {
    this.connection = connection;
  }

  public create = async ({ name, amount }: IProduct) => {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
      [name, amount],
    );
    return { id: insertId, name, amount };
  };

  public listAll = async () => {
    const [products] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products;',
    );
    return products as IProduct[];
  };

  public getByNameAndAmount = async ({ name, amount }: IProduct) => {
    const [product] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products WHERE name = ? AND amount = ?;',
      [name, amount],
    );

    if (!product || product.length === 0) return null;
    return product[0] as IProduct;
  };
}

export default ProductModel;
