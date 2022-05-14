import { RowDataPacket } from 'mysql2/promise';
import { IOrder } from './interfaces';
import { IProduct } from '../Product/interfaces';
import connection from '../models/connection';

interface IOrderModel {
  listAll(): Promise<IOrder[] | IOrder>;
}

class OrderModel implements IOrderModel {
  private connection;

  constructor() {
    this.connection = connection;
  }

  public listAll = async () => {
    const [orderRows] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Orders',
    );
    const [productRows] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products',
    );

    const rawOrders = orderRows as IOrder[];
    const products = productRows as IProduct[];

    const orders = rawOrders.map((order: IOrder) => {
      const productsIds = products.reduce((ids: number[], p: IProduct): number[] => {
        if (p.id && p.orderId === order.id) {
          return [...ids, p.id];
        }
        return ids;
      }, []);
      return { ...order, productsIds };
    });

    return (orders.length === 1) ? orders[0] as IOrder : orders as IOrder[];
  };
}

export default OrderModel;
