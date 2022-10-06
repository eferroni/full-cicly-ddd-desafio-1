import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIdCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2-handler";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log-handler";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIdCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIdCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all events", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIdCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    eventDispatcher.unregisterAll();
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIdCreatedHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      price: 10,
    });
    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
    });
    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify when a customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toBeDefined();

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "1",
      nome: "Customer 1",
      endereco: "street, 12, zip, city",
    });
    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyEventHandler).toHaveBeenCalled();
  });
});
