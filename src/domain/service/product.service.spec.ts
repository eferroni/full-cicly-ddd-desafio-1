import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit test", () => {
  it("should increase the price of all products", () => {
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);

    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
  it("should decrease the price of all products", () => {
    const product1 = new Product("123", "Product 1", 10);
    const product2 = new Product("456", "Product 2", 20);

    const products = [product1, product2];

    ProductService.decreasePrice(products, 10);

    expect(product1.price).toBe(9);
    expect(product2.price).toBe(18);
  });
});
