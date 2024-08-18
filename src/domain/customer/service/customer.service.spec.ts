import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import EnviaConsoleLogHandler from "../event/handler/send-console-log-when-address-is-changed.handler";
import EnviaConsoleLog1Handler from "../event/handler/send-console-log1-when-customer-is-created.handler copy";
import EnviaConsoleLog2Handler from "../event/handler/send-console-log2-when-customer-is-created.handler";
import Address from "../value-object/address";
import CustomerService from "./customer.service";

describe("customer service unit test", () => {
  it("should create a customer", () => {
    // Arrange
    const eventDispatcherMock: EventDispatcherInterface = {
      notify: jest.fn(),
      register: jest.fn(),
      unregister: jest.fn(),
      unregisterAll: jest.fn(),
    };
    const customerService = new CustomerService(eventDispatcherMock);
    const customer = customerService.createCustomer();
    expect(customer).toBeDefined();
    expect(eventDispatcherMock.notify).toBeCalled();
  });

  it("should create a customer and notify event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    const eventHandlerSpy2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register(CustomerCreatedEvent.name, eventHandler);
    eventDispatcher.register(CustomerCreatedEvent.name, eventHandler2);

    const eventDispatcherSpy = jest.spyOn(eventDispatcher, "notify");

    const customerService = new CustomerService(eventDispatcher);
    const customer = customerService.createCustomer();
    expect(customer).toBeDefined();
    expect(eventHandlerSpy).toHaveBeenCalled();
    expect(eventHandlerSpy2).toHaveBeenCalled();
    expect(eventDispatcherSpy).toHaveBeenCalled();
  });

  it("should change address", () => {
    // Arrange
    const eventDispatcherMock: EventDispatcherInterface = {
      notify: jest.fn(),
      register: jest.fn(),
      unregister: jest.fn(),
      unregisterAll: jest.fn(),
    };
    const customerService = new CustomerService(eventDispatcherMock);
    const customer = customerService.createCustomer();
    const address = new Address("Rua 1", 123, "555", "Fortaleza");

    customerService.changeAddress(customer, address);
    expect(customer.Address).toEqual(address);
    expect(eventDispatcherMock.notify).toBeCalled();
  });

  it("should change address and notify event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register(CustomerAddressChangedEvent.name, eventHandler);
    const eventDispatcherSpy = jest.spyOn(eventDispatcher, "notify");

    const customerService = new CustomerService(eventDispatcher);
    const customer = customerService.createCustomer();
    const address = new Address("Rua 1", 123, "555", "Fortaleza");
    customerService.changeAddress(customer, address);

    expect(customer.Address).toEqual(address);
    expect(eventHandlerSpy).toHaveBeenCalled();
    expect(eventDispatcherSpy).toHaveBeenCalled();
  });
});
