import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should starts as inactive", () => {
    const customer = new Customer("123", "John");
    expect(customer.isActive()).toBe(false);
  });

  it("should change name", () => {
    const customer = new Customer("123", "John");
    customer.changeName("Jane");
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua 1", 123, "90650-909", "Porto Alegre");
    customer.Address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Rua 1", 123, "90650-909", "Porto Alegre");
    customer.Address = address;
    customer.activate();
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined", () => {
    const customer = new Customer("123", "John");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is required");
  });

  it("should add reward points", () => {
    const customer = new Customer("c1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
