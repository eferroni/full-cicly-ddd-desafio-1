import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw an error when customer id is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrowError("Customer Id is required");
  });

  it("should throw an error when order item is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Item qtd must be greater than 0");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 200, "p2", 2);
    const order = new Order("123", "123", [item1, item2]);
    const total = order.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qtd is lower or equal than 0", () => {
    const item1 = new OrderItem("1", "Item 1", 100, "p1", 0);

    expect(() => {
      const order = new Order("123", "123", [item1]);
    }).toThrowError("Item quantity must be greater than 0");
  });
});
