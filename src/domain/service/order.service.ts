import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (orderItems.length === 0) {
      throw new Error("Order must have at least one item");
    }
    const order = new Order(uuid(), customer.id, orderItems);
    const total = order.total();
    customer.addRewardPoints(total / 2);
    return order;
  }
}
