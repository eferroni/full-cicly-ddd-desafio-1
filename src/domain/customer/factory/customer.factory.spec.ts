import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Customer 1");
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street 1", 1, "zip", "city");
    const customer = CustomerFactory.createWithAddress("Customer 2", address);
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 2");
    expect(customer.Address).toBeDefined();
    expect(customer.Address).toBe(address);
  });
});
