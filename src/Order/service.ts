import { StatusCodes } from 'http-status-codes';
import OrderModel from './model';
import { IOrder } from './interfaces';
import RequestError from '../utils/RequestError';

const messages = {
  EMPTY_ARRAY: '"productsIds" must include only numbers',
};

interface IOrderService {
  listAll: () => Promise<IOrder[] | IOrder>;
  create: ({ userId, productsIds }: IOrder) => Promise<IOrder>;
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

  public create = async ({ userId, productsIds }: IOrder) => {
    if (productsIds.length === 0) {
      throw new RequestError(messages.EMPTY_ARRAY, StatusCodes.UNPROCESSABLE_ENTITY);
    }
    const order = await this.model.create({ userId, productsIds });
    return order;
  };
}

export default OrderService;
