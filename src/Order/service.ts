import OrderModel from './model';
import { IOrder } from './interfaces';

interface IOrderService {
  listAll: () => Promise<IOrder[] | IOrder>;
}

class OrderService implements IOrderService {
  private model;

  constructor() {
    this.model = new OrderModel();
  }

  public listAll = async () => {
    const orders = await this.model.listAll();
    return orders;
  };
}

export default OrderService;
