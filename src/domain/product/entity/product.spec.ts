import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product 1", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("123", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when id and name is empty", () => {
    expect(() => {
      let product = new Product("", "", 100);
    }).toThrowError("product: Id is required,product: Name is required");
  });

  it("should throw error when price is less than 0", () => {
    expect(() => {
      let product = new Product("123", "Product 1", -1);
    }).toThrowError("product: Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 10);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});
